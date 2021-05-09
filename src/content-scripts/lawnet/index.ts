import { Action, ACTION } from 'src/models/Action';
import { CITATION_OPTION, FORMAT } from 'src/models/util';
import { ContentScriptImpl, ContentScriptService } from 'src/services/content-script-service';
import { StringImpl, StringService } from 'src/services/string-service';
import { generateTemplate } from './generate-template';
import { getCitation } from './get-citation/get-citation';

// IIFE
(() => {
  function main (stringService: StringImpl, contentScriptService: ContentScriptImpl) {
    let citation = '';
    const err: Error | null = null;

    // State
    let contextMenuClicked: boolean = false;
    let citationStyle: CITATION_OPTION = CITATION_OPTION.SAL;

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
        generateTemplate(copiedText as string, caseName, caseReferenceSuffix, paraNumber, FORMAT.PLAIN_TEXT, citationStyle)
      );
      (event.clipboardData as DataTransfer).setData(
        FORMAT.HTML,
        generateTemplate(copiedText as string, caseName, caseReferenceSuffix, paraNumber, FORMAT.HTML, citationStyle)
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
          citationStyle = (message.payload as CITATION_OPTION);
          console.log('console-menu clicked');
          document.execCommand('copy');
          contextMenuClicked = false;
        }
      });

    contentScriptService
      .from('POPUP-SCRIPT')
      .subscribe((message: Action) => {
        console.log(`citationStyle selected: ${message.payload}`);
        citationStyle = (message.payload as CITATION_OPTION);
        if (message.type === ACTION.PROVISION_STATUS && citation.length > 0) {
          return Promise.resolve(new Action(ACTION.PROVISION_SUCCESS, citation));
        } else if (message.type === ACTION.PROVISION_STATUS && err != null) {
          const errorMessage: string = (err as Error).message;
          return Promise.resolve(new Action(ACTION.PROVISION_ERROR, errorMessage));
        }
      });
  }

  // Dependency Injection
  main(new StringService(), new ContentScriptService());
})();
