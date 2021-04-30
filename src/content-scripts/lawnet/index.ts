import { Action, ACTION } from 'src/models/Action';
import { ContentScriptImpl, ContentScriptService } from 'src/services/content-script-service';
import { StringImpl, StringService } from 'src/services/string-service';
import { FORMAT, generateTemplate } from './generate-template';
import { getCitation } from './get-citation/get-citation';

function main (stringService: StringImpl, contentScriptService: ContentScriptImpl) {
  let citation = '';
  const err: Error | null = null;
  let contextMenuClicked: boolean = false;

  document.addEventListener('copy', (event: ClipboardEvent) => {
    // only copy with citation when the user clicks the context menu
    if (!contextMenuClicked) return;

    const copiedText: string | undefined = document.getSelection()?.toString();
    const targetElement = event.target as HTMLElement;

    const { caseName, caseReferenceSuffix, paraNumber } = getCitation(targetElement, { stringService });
    citation = `${caseName} ${caseReferenceSuffix} at [${paraNumber}]`;
    console.log(citation);

    (event.clipboardData as DataTransfer).setData(
      FORMAT.PLAIN_TEXT,
      generateTemplate(copiedText as string, caseName, caseReferenceSuffix, paraNumber, FORMAT.PLAIN_TEXT)
    );
    (event.clipboardData as DataTransfer).setData(
      FORMAT.HTML,
      generateTemplate(copiedText as string, caseName, caseReferenceSuffix, paraNumber, FORMAT.HTML)
    );

    // You need to prevent the default action in the event handler to prevent your changes from being overwritten by the browser:
    event.preventDefault();
  });

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

  contentScriptService
    .from('POPUP-SCRIPT')
    .subscribe((message: Action) => {
      if (message.type === ACTION.PROVISION_STATUS && citation.length > 0) {
        return Promise.resolve(new Action(ACTION.PROVISION_SUCCESS, citation));
      } else if (message.type === ACTION.PROVISION_STATUS && err != null) {
        return Promise.resolve(new Action(ACTION.PROVISION_ERROR, err['message']));
      }
    });
}

// Dependency Injection
main(new StringService(), new ContentScriptService());
