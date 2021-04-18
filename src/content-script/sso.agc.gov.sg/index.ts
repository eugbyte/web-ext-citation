import { DOMImpl, DOMService } from "src/services/dom-service";
import { getProvisions } from "./getProvisions";

export function getCitation(targetElement: HTMLElement): string {
  const domService: DOMImpl = new DOMService();

  // Clone the target element so that the actual DOM is not affected
  const cloneTarget: HTMLElement = domService.copyNodeWithParentRef(targetElement);

  // The idea here is to 
  /*
  1. Extract the entire full provision
  2. Get the start and end indexes of the section which the copy event bubbled from
     Cannot just use copied text as may be multiple occurences
  3. With the end index, use regex to extract the provisions, e.g. (1)(a)(ii)
  */

  // Get the full provision text
  /*
  <div>
    <span>text</span>
    <span>text copiedText text</span>   // sectionText = text + copiedText + text
    ...
  </div>
  fullText = text\n + text + copiedText + text
  */
  const rootElement: HTMLElement = domService.traverseUpToElement(cloneTarget, "DIV");
  const fullText: string = rootElement.innerText;

  // For some reason, for the first provisions, e.g. 14(1), 15(1), 15. ,
  // on copy, the target element bubbles from the parent element instead of from the textNode 
  /* e.g. bubble from div instead of textNode
    <div>
      <textNode>desired copied text</textNode>
      <table>unwanted text</table>
    </div>
  */
  // That means the inner text will contain unwanted additional text from the table
  const table: HTMLTableElement | null = cloneTarget.querySelector("table");
  if (table != null) cloneTarget.removeChild(table);

  // The full text of the sub section which the user copied
  const sectionText: string = cloneTarget.innerText;
  const provision: string = getProvisions(sectionText, fullText);

  (cloneTarget.parentElement as HTMLElement).removeChild(cloneTarget);

  return provision;
}


