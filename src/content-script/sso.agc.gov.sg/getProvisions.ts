import { ProvisionImpl, ProvisionService, ProvisionComponent } from "src/services/provision-service";
import { RegexImpl, RegexService } from "src/services/regex-service";

export function getProvisions (sectionText: string, parentFullText: string): string {
  const regexService: RegexImpl = new RegexService(); 
  const provService: ProvisionImpl = new ProvisionService();

    // E.g. 15.—(1) or 15. or (a)
    const regex = /\d+\w?\.—\(\d+\)|\d+\.|\n\(\w+\)/g;
  
    const matches: RegExpMatchArray[] = regexService.findMatches(regex, parentFullText);
    let provisions: ProvisionComponent[] = matches.map(m => new ProvisionComponent(m.index ?? -1, m[0]));

    // Need to seperate 15.—(1) into 15 and (1)
    // Need to separate 15. into 15 and (-1). Need -1 as the rules for completing a provision assumes a bracketed number, e.g. 15(2)
    const originalFirstComponent = provisions.shift() as ProvisionComponent;
    const [newFirstComponent, newSecondComponent] = provService.splitFirstProvisionComponent(originalFirstComponent);
    provisions.unshift(...[newFirstComponent, newSecondComponent]);
  
    // Find the EOS token to know when to stop the search
    const startIndex: number = regexService.getStartIndexOfCopiedText(sectionText, parentFullText);
    const endIndex: number = startIndex + sectionText.length - 1;
    console.log(startIndex, endIndex);
    provisions.push(new ProvisionComponent(endIndex, '<EOS>')); // end of sentence token
  
    // sort the provisonComponent array by descending order
    provisions = provService.sortProvComponentsByDescending(provisions);
    console.log(provisions);
  
    // Add the provision components to the start of the array
    // e.g. (i) -> (a) -> 15
    let provResult: string[] = [];
  
    for (const prov of provisions) {
      if (prov.index >= endIndex) continue;
  
      const text = prov.text.replace(/(\r\n|\n|\r)/g, '');
  
      // The first prov component after the EOS is added
      if (provResult.length === 0) {
        provResult.push(text);
        continue;
      }
  
      const prevProv: string = provResult[0];
  
      // e.g. 15(2)(a)(i)
      // isNumber, isBracketedNumber, isAlpha, isRomanNumeral
  
      // prevProvResult isRoman, add the next prov that is alpha
      // e.g. (i), next prov should be (a)
      // need to cater for e.g. 15(i), by checking for Roman first before Alpha
      if (regexService.isBracketedRoman(prevProv) && regexService.isBracketedAlpha(text) && text !== '(i)') provResult.unshift(text);
  
      // prevProvResult isAlpha, add the next prov that is a number
      // e.g. (a), next prov should be (2)
      if (regexService.isBracketedAlpha(prevProv) && regexService.isBracketedNumber(text)) provResult.unshift(text);
  
      // e.g. (2), next prov should be 15
      if (regexService.isBracketedNumber(prevProv) && regexService.isNumber(text)) provResult.unshift(text);
  
      // prevResult isNumber
      // Only the first component of the provision is a number, e.g. 15
      const isFirstProvComponent: boolean = regexService.isNumber(prevProv);
      if (isFirstProvComponent) break;
    }

    // For provisions that are 15. , (-1) was previously added
    provResult = provResult.filter(prov => prov !== "(-1)");
    return provResult.join('');
  }