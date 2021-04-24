import { DOMService } from 'src/services/dom-service';
import { ProvisionImpl } from 'src/services/provision-service';
import { StringImpl } from 'src/services/string-service';
import { getChapter } from './get-chapter';
import { getProvisions } from './get-provisions';

interface ServicesImpl {
  stringService: StringImpl;
  domService: DOMService;
  provisionService: ProvisionImpl
}

/*
  The idea here is to
  1. Extract the entire full provision
  2. Get the entire text of the section which the copy event bubbled from
    Cannot just use copied text as may be multiple occurences
  3. Use regex to extract the provisions, e.g. (1)(a)(ii)
*/

export function getCitation (targetElement: HTMLElement, copiedText: string,
  { stringService, domService, provisionService }: ServicesImpl
): string {
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
  const rootElement: HTMLElement = domService.traverseUpToElement(cloneTarget, 'DIV');
  let fullText: string = rootElement.innerText;

  // The full text of the sub section which the user copied
  let sectionText: string = cloneTarget.innerText;
  sectionText = removeUnhandledSectionText(cloneTarget, stringService);

  // Remove the clone to prevent memory waste
  (cloneTarget.parentElement as HTMLElement).removeChild(cloneTarget);

  // When the user selects the text from the one section

  // Clean text
  [sectionText, fullText, copiedText] = [sectionText, fullText, copiedText].map(txt => cleanText(txt, stringService));

  console.log(`fullText: \n${JSON.stringify(fullText)}`);
  console.log(`sectionText: \n${JSON.stringify(sectionText)}`);
  console.log(`copiedText: \n${JSON.stringify(copiedText)}`);

  console.log(sectionText.includes(copiedText));

  // If the user copies a short text, this might result in repeated occurences when searching for said text in the parentFullText
  // Thus, combine the copied text with the sectionText, i.e., the text from the html element the copy event originated from
  const unionText = stringService.unionStrings(copiedText, sectionText) as string;
  console.log(`unionText: \n${JSON.stringify(unionText)}`);

  const provision: string = getProvisions(unionText, fullText, { stringService, provisionService });
  const chapter: string = getChapter({ stringService });

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
function removeUnhandledSectionText (targetElement: HTMLElement, stringService: StringImpl): string {
  const innerText = targetElement.innerText;
  const matches = stringService.findMatches(/\([a-z]+\)/g, innerText);

  if (matches.length === 0) return innerText;

  const index = matches[0].index as number;
  return targetElement.innerText.slice(0, index);
}

function cleanText (str: string, stringService: StringImpl): string {
  str = stringService.reduceLineBreaks(str);
  str = stringService.reduceWhiteSpacesExceptLineBreaks(str);
  return str;
}
