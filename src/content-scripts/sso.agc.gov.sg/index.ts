import { DOMImpl, DOMService } from 'src/services/dom-service';
import { ProvisionImpl, ProvisionService } from 'src/services/provision-service';
import { StringImpl, StringService } from 'src/services/string-service';
import { ACTION, Action } from 'src/models/Action';
import { ContentScriptImpl, ContentScriptService } from 'src/services/content-script-service';
import { FORMAT, generateTemplate } from './generate-template';
import { getCitation } from './get-citation/get-citation';

function main (stringService: StringImpl, domService: DOMImpl, provisionService: ProvisionImpl, contentScriptService: ContentScriptImpl) {
  let provision = '';
  let err: Error | null = null;
  let contextMenuClicked: boolean = false;

  const copyWithCitation = (event: ClipboardEvent) => {
    // only copy with citation when the user clicks the context menu
    if (!contextMenuClicked) return;

    const copiedText: string | undefined = document.getSelection()?.toString();
    const targetElement = event.target as HTMLElement;

    try {
      provision = getCitation(targetElement, copiedText as string, { stringService, domService, provisionService });
      console.log(`${provision}`);
    } catch (error) {
      err = error;
      contentScriptService
        .to('BACKGROUND-SCRIPT')
        .sendMessage(new Action(ACTION.NOTIFICATION_ERROR, 'An Error Occured'));
    }

    (event.clipboardData as DataTransfer).setData(FORMAT.PLAIN_TEXT, generateTemplate(copiedText as string, provision, FORMAT.PLAIN_TEXT));
    (event.clipboardData as DataTransfer).setData(FORMAT.HTML, generateTemplate(copiedText as string, provision, FORMAT.HTML));
    // (event.clipboardData as DataTransfer).setData('application/xml', `<w:footnote >${provision}</w:footnotes>`);

    // You need to prevent the default action in the event handler to prevent your changes from being overwritten by the browser:
    event.preventDefault();
  };

  document.addEventListener('copy', copyWithCitation);

  contentScriptService
    .from('BACKGROUND-SCRIPT')
    .subscribe((message: Action) => {
      if (message.type === ACTION.CONTEXT_MENU_CLICKED) {
        // modify the state so that copyWithCitation(), which depends on this state, can execute
        contextMenuClicked = true;
        console.log('console-menu clicked');
        document.execCommand('copy');
        contextMenuClicked = false;
      }
    });

  // Listen from actions from the popup-script
  // Avoid nested event listeners otherwise there will be closures
  // the variables will be bound and not updated
  contentScriptService
    .from('POPUP-SCRIPT')
    .subscribe((message: Action) => {
      if (message.type === ACTION.PROVISION_STATUS && provision.length > 0) {
        return Promise.resolve(new Action(ACTION.PROVISION_SUCCESS, provision));
      } else if (message.type === ACTION.PROVISION_STATUS && err != null) {
        return Promise.resolve(new Action(ACTION.PROVISION_ERROR, err.message));
      }
    });
}

// Dependency Injection
main(new StringService(), new DOMService(), new ProvisionService(), new ContentScriptService());
