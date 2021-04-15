import { getCitation } from "./sso.agc.gov.sg";

document.addEventListener('copy', (event: ClipboardEvent) => {
  const copiedText: string | undefined = document.getSelection()?.toString();
  const targetElement = event.target as HTMLElement;
  if (!copiedText) return;
  const provision: string = getCitation(targetElement);
  console.log(provision);

  (event.clipboardData as DataTransfer).setData('text/plain', copiedText);
  // (event.clipboardData as DataTransfer).setData('text/html', copiedText + '<b>Source:</b> <a href="' + document.location.href + '">' + document.title + '</a>');
  // (event.clipboardData as DataTransfer).setData('application/xml', `<footnote>Hello</footnote>`);
  event.preventDefault();
});
