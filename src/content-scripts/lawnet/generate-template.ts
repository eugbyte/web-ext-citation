import { CITATION_OPTION, FORMAT } from 'src/models/util';

export function generateTemplate (copiedText: string,
  caseName: string | null,
  caseReferenceSuffix: string | null,
  paraNumber: string | null,
  format: FORMAT,
  citationStyle: CITATION_OPTION): string {
  switch (format) {
    case FORMAT.PLAIN_TEXT:
      return `${copiedText}\n${caseName} ${caseReferenceSuffix} at [${paraNumber}]`;
    case FORMAT.HTML:
      if (citationStyle === CITATION_OPTION.SAL) {
        return `<span>${copiedText}</span>
        <br>
        <span style="color:red"><i>${caseName}</i> ${caseReferenceSuffix} at [${paraNumber}]</span>`;
      } else if (citationStyle === CITATION_OPTION.SAL_WO_COLOR) {
        return `<span>${copiedText}</span>
        <br>
        <span><i>${caseName}</i> ${caseReferenceSuffix} at [${paraNumber}]</span>`;
      } else {
        return '';
      }
      break;
    default:
      return '';
  }
}
