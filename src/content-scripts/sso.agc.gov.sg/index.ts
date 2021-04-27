import { DOMImpl, DOMService } from 'src/services/dom-service';
import { ProvisionImpl, ProvisionService } from 'src/services/provision-service';
import { StringImpl, StringService } from 'src/services/string-service';
import { getCitation } from './get-citation';
import { ACTION, Action } from 'src/models/Action';
import { ContentScriptImpl, ContentScriptService } from 'src/services/content-script-service';

enum FORMAT {
  PLAIN_TEXT = 'text/plain',
  HTML = 'text/html'
}

function main (stringService: StringImpl, domService: DOMImpl, provisionService: ProvisionImpl, contentScriptService: ContentScriptImpl) {
  let provision = '';
  let err: Error | null = null;
  document.addEventListener('copy', (event: ClipboardEvent) => {
    const copiedText: string | undefined = document.getSelection()?.toString();
    const targetElement = event.target as HTMLElement;

    if (!copiedText) return;
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

function generateTemplate (copiedText: string, provision: string, format: FORMAT): string {
  switch (format) {
    case FORMAT.PLAIN_TEXT:
      return `${copiedText}\n${provision}`;
    case FORMAT.HTML:
      return `<span>${copiedText}</span>
      <br>
      <span style="color:red">${provision}</span>`;
    default:
      return '';
  }
}
