export function traverseUp (targetElement: HTMLElement, copiedText: string, provisions: string[] = [], iteration = 1) {
    const regex = /\d+\.—\(\d+\)|\n\(\.+\)/ ;

    const parent = targetElement.parentElement as HTMLElement;
    if (!assertElementType(targetElement, "DIV")) {

        traverseUp(parent, copiedText, provisions, iteration+1);

        const prevSibling = targetElement.previousElementSibling as HTMLElement;
        if (prevSibling && assertElementType(prevSibling, "TD")) {
            let provision: string = prevSibling.innerText;
            provisions.unshift(provision);
            console.log(targetElement.innerText + "\n", provision + "\n",  prevSibling.innerText);
        }

        if (prevSibling == null && assertElementType(targetElement, "TD")) {
            let matches: RegExpMatchArray | null = targetElement.innerText.match(regex);
            if (matches == null) return;

            let provision: string = matches[0];
            provisions.unshift(provision);
            console.log("prevSibling is null\n", provision + "\n", targetElement.innerText);
        }

        return;
    } 

    console.log(provisions);

    const innerText: string = parent.innerText;
    console.log("FOUND: " + innerText.includes(copiedText));

    const startIndex: number = innerText.indexOf(copiedText);
    const endIndex: number = startIndex + copiedText.length;
    console.log(startIndex, endIndex);        
}

// An element is a container if it contains the entire section of the statute, as opposed to the sub section 
function assertElementType(element: HTMLElement, matcher: string) {
    return element.nodeName === matcher;
}
