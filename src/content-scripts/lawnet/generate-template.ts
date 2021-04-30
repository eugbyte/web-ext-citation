export enum FORMAT {
    PLAIN_TEXT = 'text/plain',
    HTML = 'text/html'
  }

export function generateTemplate (copiedText: string, caseName: string | null, caseReferenceSuffix: string | null, paraNumber: string | null, format: FORMAT): string {
  switch (format) {
    case FORMAT.PLAIN_TEXT:
      return `${copiedText}\n${caseName} ${caseReferenceSuffix} at [${paraNumber}]`;
    case FORMAT.HTML:
      return `<span>${copiedText}</span>
        <br>
        <span style="color:red"><i>${caseName}</i> ${caseReferenceSuffix} at [${paraNumber}]</span>`;
    default:
      return '';
  }
}
