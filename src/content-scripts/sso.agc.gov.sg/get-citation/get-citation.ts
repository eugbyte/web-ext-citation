import { DOMService } from 'src/services/dom-service';
import { ProvisionImpl } from 'src/services/provision-service';
import { StringImpl } from 'src/services/string-service';
import { cleanUneededSiblingText, cleanText, removeUnwantedDateSuffix } from './clean-text';
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
  sectionText = cleanUneededSiblingText(cloneTarget, stringService);

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
  let unionText = stringService.unionStrings(copiedText, sectionText) as string;
  unionText = removeUnwantedDateSuffix(unionText, stringService);
  console.log(`unionText: \n${JSON.stringify(unionText)}`);

  console.log(fullText.includes(unionText));

  const provision: string = getProvisions(unionText, fullText, { stringService, provisionService });
  const chapter: string = getChapter({ stringService });

  return `${chapter} s ${provision}`;
}
