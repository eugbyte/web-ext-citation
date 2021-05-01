import { CITATION_OPTION, FORMAT } from 'src/models/util';

export function generateTemplate (copiedText: string, citation: string, format: FORMAT, citationStyle: CITATION_OPTION): string {
  switch (format) {
    case FORMAT.PLAIN_TEXT:
      return `${copiedText}\n${citation}`;
    case FORMAT.HTML:
      if (citationStyle === CITATION_OPTION.SAL) {
        return `<span>${copiedText}</span>
        <br>
        <span style="color:red">${citation}</span>`;
      } else if (citationStyle === CITATION_OPTION.SAL_WO_COLOR) {
        return `<span>${copiedText}</span>
        <br>
        <span>${citation}</span>`;
      }
    default:
      return '';
  }
}
