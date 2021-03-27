console.log("content-script");
console.log(document);

document.addEventListener('copy', (event: ClipboardEvent) => {
    const copiedText: string | undefined = document.getSelection()?.toString();
    const targetElement: EventTarget | null = event.target;
    console.log(targetElement);
    const modifiedText = copiedText ? copiedText + " HELLO": "";
    console.log(modifiedText);

    (event.clipboardData as DataTransfer).setData('text/plain', modifiedText);
    (event.clipboardData as DataTransfer).setData('text/xml', copiedText + '<b>Source:</b> <a href="' + document.location.href + '">' + document.title + '</a>');
    console.log(event.clipboardData);
    event.preventDefault();
});