import {traverseUp} from "./traverse-dom"

document.addEventListener('copy', (event: ClipboardEvent) => {
    const copiedText: string | undefined = document.getSelection()?.toString();
    const targetElement = event.target as HTMLElement;
    traverseUp(targetElement, targetElement.innerText as string);

    //(event.clipboardData as DataTransfer).setData('text/plain', modifiedText);
    //(event.clipboardData as DataTransfer).setData('text/html', copiedText + '<b>Source:</b> <a href="' + document.location.href + '">' + document.title + '</a>');
    (event.clipboardData as DataTransfer).setData('application/xml', `<footnote>Hello</footnote>`);
    console.log(event.clipboardData);
    event.preventDefault();
});

