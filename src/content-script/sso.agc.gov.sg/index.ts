import { getCitation } from './get-citation';

enum FORMAT {
  PLAIN_TEXT = 'text/plain',
  HTML = 'text/html'
}

document.addEventListener('copy', (event: ClipboardEvent) => {
  const copiedText: string | undefined = document.getSelection()?.toString();
  const targetElement = event.target as HTMLElement;

  if (!copiedText) return;
  const provision: string = getCitation(targetElement, copiedText as string);
  console.log(`${provision}`);

  (event.clipboardData as DataTransfer).setData(FORMAT.PLAIN_TEXT, generateTemplate(copiedText, provision, FORMAT.PLAIN_TEXT));
  (event.clipboardData as DataTransfer).setData(FORMAT.HTML, generateTemplate(copiedText, provision, FORMAT.HTML));
  // (event.clipboardData as DataTransfer).setData('application/xml', `<w:footnote >${provision}</w:footnotes>`);

  // You need to prevent the default action in the event handler to prevent your changes from being overwritten by the browser:
  event.preventDefault();
});

function generateTemplate (copiedText: string, provision: string, format: FORMAT): string {
  switch (format) {
    case FORMAT.PLAIN_TEXT:
      return `${copiedText}\n${provision}`;
    case FORMAT.HTML:
      return `<span>${copiedText}</span>
      <br>
       <span style="color:red">${provision}</span>`;
    default:
      return '';
  }
}
