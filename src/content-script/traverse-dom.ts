export function processElement (targetElement: HTMLElement, copiedText: string, iteration = 1) {

    console.log("copiedText:\n", copiedText);

    const parentElement: HTMLElement = traverseUp(targetElement, "DIV");
    const fullText: string = parentElement.innerText;
    console.log("fullText:\n", fullText);

    const regex = /\d+\.—\(\d+\)|\n\(\w+\)/g ;
    const copiedTextMatches = findMatches(regex, copiedText);
    console.log(copiedTextMatches)
    console.log("-----");
    const parentTextMatches = findMatches(regex, fullText);    
    console.log(parentTextMatches);
}



function traverseUp(element: HTMLElement, nodeName: string): HTMLElement {
    if (!(element.nodeName === nodeName)) {
        return traverseUp(element.parentElement as HTMLElement, nodeName);        
    } 
    return element;
}

function findMatches(regex: RegExp, text: string) {
    const matches = [...text.matchAll(regex)];
    return matches.map((matchArray: RegExpMatchArray) => {
        if (matchArray.length > 1) throw new Error("regex should not contain more than one match as there are no optionals");
        return {
            index: matchArray.index,
            provision: matchArray[0]
        }
    }); 
}
