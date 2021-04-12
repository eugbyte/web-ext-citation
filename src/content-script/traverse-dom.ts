import cloneDeep from "lodash.clonedeep";

class ProvisionComponent {
    constructor(public index: number, public text: string) {}
}

export function processElement (targetElement: HTMLElement, copiedText: string, iteration = 1) {

    const parentElement: HTMLElement = traverseUpToElement(targetElement, "DIV");
    const parentFullText: string = parentElement.innerText;

    //E.g. 15.—(1) or (a)
    const regex = /\d+\.—\(\d+\)|\n\(\w+\)/g ;

    const matches: RegExpMatchArray[] = findMatches(regex, parentFullText);
    let provisions: ProvisionComponent[] = matches.map(m => new ProvisionComponent(m.index ?? -1, m[0]));

    provisions.forEach(prov => {
        if (prov.index === -1) console.log("RegExpMatchArray did not have an index");
    });

    // Need to seperate 15.—(1) into 15. and (1)
    const originalFirstComponent = provisions.shift() as ProvisionComponent;
    const [newFirstComponent, newSecondComponent] = splitFirstProvisionComponent(originalFirstComponent);
    provisions.unshift(...[newFirstComponent, newSecondComponent]);
    console.log("before sort", provisions);
    
    // In case user copies the more than one provision, including the provision number
    const startIndex: number = getStartIndexOfCopiedText(targetElement, parentFullText);
    console.log("startIndex", startIndex);
    const endIndex: number = startIndex + targetElement.innerText.length;
    console.log(startIndex, endIndex);
    provisions.push(new ProvisionComponent(endIndex, "<EOS>")); // end of sentence token
    
    // sort the provisonComponent array by descending order
    provisions = sortProvComponents(provisions);
    console.log("after sort", provisions);

    for (const prov of provisions) {
        if (prov.index > endIndex) continue;
    }

    
}
function isProvisionResultComplete(provisionResult: string[]): boolean {
    // e.g. 15.—
    const regex = /\d+\.—\(\d+\)/
    if (!regex.test(provisionResult[0])) return false;

    return false;
}

function sortProvComponents(provisions: ProvisionComponent[]): ProvisionComponent[] {
    const provisionsCopy = cloneDeep(provisions);
    provisionsCopy.sort((a, b) => a.index - b.index);
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
    if (occurences > 1) {
        console.log("Unable to process more than one matches")
        //throw new Error("Unable to process more than one matches");
    }
    return parentFullText.indexOf(childFullText);
}

function traverseUpToElement(element: HTMLElement, nodeName: string): HTMLElement {
    if (!(element.nodeName === nodeName)) {
        return traverseUpToElement(element.parentElement as HTMLElement, nodeName);        
    } 
    return element;
}

function findMatches(regex: RegExp, text: string): RegExpMatchArray[] {
    const matches = [...text.matchAll(regex)]; 
    return matches;
}