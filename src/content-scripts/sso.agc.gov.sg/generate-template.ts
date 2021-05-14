import { CITATION_OPTION, FORMAT } from 'src/models/util';

export function generateTemplate (copiedText: string, citation: string, format: FORMAT, citationStyle: CITATION_OPTION): string {
  console.log({ copiedText, citation, format, citationStyle });

  if (format === FORMAT.PLAIN_TEXT) {
    return `${copiedText}\n${citation}`;
  }

  if (format === FORMAT.HTML && citationStyle === CITATION_OPTION.SAL) {
    return `<span>${copiedText}</span>
    <br>
    <span style="color:red">${citation}</span>`;
  }

  if (format === FORMAT.HTML && citationStyle === CITATION_OPTION.SAL_WO_COLOR) {
    return `<span>${copiedText}</span>
        <br>
        <span>${citation}</span>`;
  }

  if (format === FORMAT.HTML && citationStyle === CITATION_OPTION.SAL_VSTO) {
    return `<p>${copiedText}__FOOTNOTE__${citation}__/FOOTNOTE__</p>`;
  }

  throw new Error('unhandled format or citationStyle');
}
