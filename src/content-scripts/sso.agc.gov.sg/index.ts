import { DOMImpl, DOMService } from 'src/services/dom-service';
import { ProvisionImpl, ProvisionService } from 'src/services/provision-service';
import { StringImpl, StringService } from 'src/services/string-service';
import { getCitation } from './get-citation';
import { ACTION, Action } from 'src/models/Action';
import { ContentScriptImpl, ContentScriptService } from 'src/services/content-script-service';
import { BackgroundScriptService } from 'src/services/background-script-service';

enum FORMAT {
  PLAIN_TEXT = 'text/plain',
  HTML = 'text/html'
}

function main (stringService: StringImpl, domService: DOMImpl, provisionService: ProvisionImpl, contentScriptService: ContentScriptImpl) {
  let provision = '';
  document.addEventListener('copy', (event: ClipboardEvent) => {
    const copiedText: string | undefined = document.getSelection()?.toString();
    const targetElement = event.target as HTMLElement;

    if (!copiedText) return;
    provision = getCitation(targetElement, copiedText as string, { stringService, domService, provisionService });
    console.log(`${provision}`);

    (event.clipboardData as DataTransfer).setData(FORMAT.PLAIN_TEXT, generateTemplate(copiedText, provision, FORMAT.PLAIN_TEXT));
    (event.clipboardData as DataTransfer).setData(FORMAT.HTML, generateTemplate(copiedText, provision, FORMAT.HTML));
    // (event.clipboardData as DataTransfer).setData('application/xml', `<w:footnote >${provision}</w:footnotes>`);

    contentScriptService
      .to('BACKGROUND-SCRIPT')
      .sendMessage(new Action(ACTION.NOTIFICATION_SUCCESS, provision));

    // You need to prevent the default action in the event handler to prevent your changes from being overwritten by the browser:
    event.preventDefault();
  });

  // Listen from actions from the popup-script
  // Avoid nested event listeners otherwise there will be closures
  // the variables will be bound and not updated
  contentScriptService
    .from('POPUP-SCRIPT')
    .subscribe((message: Action, _sender, sendResponse) => {
      if (message.type === ACTION.FROM_POPUP) {
        sendResponse(new Action(ACTION.FROM_CONTENT_SCRIPT, provision));
      }
    });
}

try {
  // Dependency Injection
  main(new StringService(), new DOMService(), new ProvisionService(), new ContentScriptService());
} catch (error) {
  // if there are errors, send basic notification to user
  console.log(error);
  const backgroundScriptService = new BackgroundScriptService();
  backgroundScriptService.createBasicNotification('Error', 'Error occured');
}

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
