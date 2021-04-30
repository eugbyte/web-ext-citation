export enum FORMAT {
    PLAIN_TEXT = 'text/plain',
    HTML = 'text/html'
  }

export function generateTemplate (copiedText: string, citation: string, format: FORMAT): string {
  switch (format) {
    case FORMAT.PLAIN_TEXT:
      return `${copiedText}\n${citation}`;
    case FORMAT.HTML:
      return `<span>${copiedText}</span>
        <br>
        <span style="color:red">${citation}</span>`;
    default:
      return '';
  }
}
