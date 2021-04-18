import { DOMImpl, DOMService } from "src/services/dom-service";
import { RegexService } from "src/services/regex-service";
import { getChapter } from "./getChapter";
import { getProvisions } from "./getProvisions";

/*
  The idea here is to 
  1. Extract the entire full provision
  2. Get the entire text of the section which the copy event bubbled from
    Cannot just use copied text as may be multiple occurences
  3. Use regex to extract the provisions, e.g. (1)(a)(ii)
*/

export function getCitation(targetElement: HTMLElement, copiedText: string): string {
  const domService: DOMImpl = new DOMService();

  // Clone the target element so that the actual DOM is not affected
  const cloneTarget: HTMLElement = domService.duplicateNodeWithParentRef(targetElement);

  // 1. Get the full provision text
  /*
  <div>
    <span>text1</span>
    <span>text2 copiedText text3</span> 
    ...
  </div>
  sectionText = text2 + copiedText + text3
  fullText = text1 + text2 + copiedText + text3
  */
  const rootElement: HTMLElement = domService.traverseUpToElement(cloneTarget, "DIV");
  const fullText: string = rootElement.innerText;

  // The full text of the sub section which the user copied
  let sectionText: string = cloneTarget.innerText;  
  sectionText = removeUnhandledSectionText(cloneTarget);

  if (copiedText.length > sectionText.length) {
    [copiedText, sectionText] = [sectionText, copiedText];
  }

  console.log(`sectionText: \n${sectionText}`);

  (cloneTarget.parentElement as HTMLElement).removeChild(cloneTarget);

  const provision: string = getProvisions(sectionText, fullText);
  const chapter: string = getChapter();

  return `${chapter} s ${provision}`;
}

// For some reason, for the first sub section, e.g. 14(1), 15(1), 15. ,
  // the copy event bubbles from the parent element instead of from the target element 
  /* e.g. bubble from span instead of textNode, even though textNode was copied (crtl c)
    <span>
      <textNode>desired copied text</textNode>
      <table>unwanted text</table>
    </span>
  */
  // That means the inner text will contain unwanted additional text from the table
  
function removeUnhandledSectionText(targetElement: HTMLElement): string {
  const regexService = new RegexService();
  const innerText = targetElement.innerText;
  const matches = regexService.findMatches(/\([a-z]+\)/g, innerText);

  if (matches.length === 0) return innerText;

  const index = matches[0].index as number;
  // In case the user copies and include the subsection at the start of the sentence
  if (index < 8) return innerText;

  const sectionText = targetElement.innerText.slice(0, index);
  return sectionText;
}

