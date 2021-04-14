import cloneDeep from "lodash.clonedeep";

class ProvisionComponent {
    constructor(public index: number, public text: string) {}

    toString() {
        return `{ index: ${this.index}}, text: ${this.text} }`
    }
}

export function processElement (targetElement: HTMLElement) {

    const parentElement: HTMLElement = traverseUpToElement(targetElement, "DIV");
    const parentFullText: string = parentElement.innerText;
    console.log(parentFullText);

    //E.g. 15.—(1) or (a)
    const regex = /\d+\w?\.—\(\d+\)|\n\(\w+\)/g ;

    const matches: RegExpMatchArray[] = findMatches(regex, parentFullText);
    let provisions: ProvisionComponent[] = matches.map(m => new ProvisionComponent(m.index ?? -1, m[0]));
    console.log(provisions);

    // Need to seperate 15.—(1) into 15. and (1)
    const originalFirstComponent = provisions.shift() as ProvisionComponent;
    const [newFirstComponent, newSecondComponent] = splitFirstProvisionComponent(originalFirstComponent);
    provisions.unshift(...[newFirstComponent, newSecondComponent]);
    
    // In case user copies the more than one provision, including the provision number
    const startIndex: number = getStartIndexOfCopiedText(targetElement, parentFullText);
    const endIndex: number = startIndex + targetElement.innerText.length;
    console.log(startIndex, endIndex);
    provisions.push(new ProvisionComponent(endIndex, "<EOS>")); // end of sentence token
    
    // sort the provisonComponent array by descending order
    provisions = sortProvComponentsByDescending(provisions);
    console.log("after sort", provisions);

    // Add the provision components to the start of the array
    // e.g. (i) -> (a) -> 15
    const provResult: string[] = [];

    for (const prov of provisions) {
        if (prov.index >= endIndex) {
            console.log(`${prov} skipped`);
            continue;
        } 
        const text = prov.text.replace(/(\r\n|\n|\r)/g, "");

        // The first prov component after the EOS is added
        if (provResult.length === 0) {
            provResult.push(text);
            console.log(`prov closest to EOS ${prov.toString()}`)
            continue;
        }

        const prevProv: string = provResult[0];
        console.log(`prevProv: ${prevProv}`)

        // e.g. 15(a)(i)
        // isNumber, isAlpha, isRomanNumeral

        // prevProvResult isRoman, add the next prov that is alpha
        // e.g. (i), next prov should be (a)
        // need to cater for e.g. 15(i), by checking with 
        if (isRoman(prevProv)) {
            console.log("prevProv isRoman");
            if (isAlpha(text)) {
                provResult.unshift(text);
            }
        }
        
        // prevProvResult isAlpha, add the next prov that is a number
        // e.g. (a), next prov should be 15
        if (isAlpha(prevProv)) {
            console.log("prevProv isAlpha")
            if (isNumber(text)) {
                provResult.unshift(text);
            }
        }
        
        // prevResult isNumber
        // Only the first component of the provision is a number, e.g. 15 (a)(i)
        const isFirstProvComponent: boolean = isNumber(prevProv);
        if (isFirstProvComponent) {
            break;
        }

    }

    console.log("result", provResult);

    
}

// E.g. (a)
function isAlpha(str: string): boolean {
    return /\([A-Z]+\)/i.test(str);
}

function isRoman(str: string): boolean {
    const regex = /^\((M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))\)$/i
    return regex.test(str);
}

function isNumber(str: string): boolean {
    return !isNaN(parseInt(str));
}

function sortProvComponentsByDescending(provisions: ProvisionComponent[]): ProvisionComponent[] {
    const provisionsCopy = cloneDeep(provisions);
    provisionsCopy.sort((a, b) => b.index - a.index);
    return provisionsCopy;
}

// Need to seperate 15.—(1) into 15. and (1)
function splitFirstProvisionComponent(originalFirstComponent: ProvisionComponent): ProvisionComponent[] {
    const [firstProvText, secondProvText] = originalFirstComponent.text.split(".—");
    const secondProvIndex = originalFirstComponent.index + originalFirstComponent.text.length;
    return [
        new ProvisionComponent(originalFirstComponent.index, firstProvText),
        new ProvisionComponent(secondProvIndex, `\n${secondProvText}`)
    ];
}

function getStartIndexOfCopiedText(targetElement: HTMLElement, parentFullText: string): number {
    const childFullText: string = targetElement.innerText;
    const occurences = parentFullText.split(childFullText).length;
    if (occurences > 2) {
        console.log("Unable to process more than one matches")
        throw new Error("Unable to process more than one matches");
    }
    return parentFullText.indexOf(childFullText);
}

function traverseUpToElement(element: HTMLElement, nodeName: string, _iteration=1): HTMLElement {
    if (!(element.nodeName === nodeName)) {
        return traverseUpToElement(element.parentElement as HTMLElement, nodeName);        
    } 
    return element;
}

function findMatches(regex: RegExp, text: string): RegExpMatchArray[] {
    const matches = [...text.matchAll(regex)]; 
    return matches;
}