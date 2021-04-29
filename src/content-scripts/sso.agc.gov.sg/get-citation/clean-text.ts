// For some reason, for the first sub section, e.g. 14(1), 15(1), 15. ,
// the copy event bubbles from the parent element instead of from the target element
/* e.g. bubble from span instead of textNode, even though textNode was copied (crtl c)
    <span>
      <textNode>desired copied text</textNode>
      <table>unwanted text</table>
    </span>
  */
// That means the inner text will contain unwanted additional text from the table

import { StringImpl } from "src/services/string-service";

// so, one way is to remove the \n(a) appear in the next sibling
export function cleanUneededSiblingText (targetElement: HTMLElement, stringService: StringImpl): string {
    const innerText = targetElement.innerText;
    const matches = stringService.findMatches(/\([a-z]+\)/g, innerText);
  
    if (matches.length === 0) return innerText;
  
    const index = matches[0].index as number;
    return targetElement.innerText.slice(0, index);
}


// mentioned in paragraph (a). \n[Act 40 of 2020 wef 01/02/2021]
export function removeUnwantedSourceSuffix(str: string, stringService: StringImpl) {
    const matches = stringService.findMatches(/\[.+\]/g, str);
    console.log("removeUnwantedSourceSuffix", matches);
    if (matches.length === 0) return str;
    const match = matches[matches.length - 1];
    return str.slice(0, match.index);
}
  
 export function cleanText (str: string, stringService: StringImpl): string {
    str = stringService.reduceLineBreaks(str);
    str = stringService.reduceWhiteSpacesExceptLineBreaks(str);
    return str;
  }
  