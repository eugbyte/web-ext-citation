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
  let fullText: string = rootElement.innerText;

  // The full text of the sub section which the user copied
  let sectionText: string = cloneTarget.innerText;  
  sectionText = removeUnhandledSectionText(cloneTarget);

  // Remove the clone to prevent memory waste
  (cloneTarget.parentElement as HTMLElement).removeChild(cloneTarget);

  // When the user selects the text from the one section

  // Clean text
  [sectionText, fullText, copiedText] = [sectionText, fullText, copiedText].map(txt => cleanText(txt));

  // for (let i = 0; i < 200; i++) {
  //   let word = fullText[i];
  //   if (i < 1) continue;
  //   if (/\s/.test(word) && word !== " ") {
  //     let prevWord;
  //     if (i > 10) {
  //       prevWord = fullText.substring(i-10, i);
  //     }
      
  //     console.log(prevWord);
  //     console.log(JSON.stringify(word));
  //     console.log("regexSpace^");
  //     console.log();
  //   }
  // }
 
  //sectionText  = '13. ';
  //fullText = "Consent required\n13.  An organisation "

  console.log(`fullText: \n${JSON.stringify(fullText)}|`)
  console.log(`sectionText: \n${JSON.stringify(sectionText)}|`);
  console.log(`copiedText: \n${JSON.stringify(copiedText)}|`);

  console.log(fullText.includes(copiedText));

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
  // so, one way is to remove the \n(a) appear in the next sibling
function removeUnhandledSectionText(targetElement: HTMLElement): string {
  const regexService = new RegexService();
  const innerText = targetElement.innerText;
  const matches = regexService.findMatches(/\([a-z]+\)/g, innerText);

  if (matches.length === 0) return innerText;

  const index = matches[0].index as number;
  return targetElement.innerText.slice(0, index);
}

function cleanText(str: string): string {
  const regexService = new RegexService();
  str = regexService.reduceLineBreaks(str);
  str = regexService.replaceTabsWithSpace(str);
  str = regexService.reduceWhiteSpacesExceptLineBreaks(str);
  return str;
}