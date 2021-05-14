import { CITATION_OPTION, FORMAT } from 'src/models/util';

export function generateTemplate (copiedText: string,
  caseName: string | null,
  caseReferenceSuffix: string | null,
  paraNumber: string | null,
  format: FORMAT,
  citationStyle: CITATION_OPTION): string {
  if (format === FORMAT.PLAIN_TEXT) {
    return `${copiedText}\n${caseName} ${caseReferenceSuffix} at [${paraNumber}]`;
  }

  if (format === FORMAT.HTML && citationStyle === CITATION_OPTION.SAL) {
    return `<span>${copiedText}</span>
        <br>
        <span style="color:red"><i>${caseName}</i> ${caseReferenceSuffix} at [${paraNumber}]</span>`;
  }

  if (format === FORMAT.HTML && citationStyle === CITATION_OPTION.SAL_WO_COLOR) {
    return `<span>${copiedText}</span>
        <br>
        <span><i>${caseName}</i> ${caseReferenceSuffix} at [${paraNumber}]</span>`;
  }

  if (format === FORMAT.HTML && citationStyle === CITATION_OPTION.SAL_VSTO) {
    return `<p>${copiedText} __FOOTNOTE__${caseName} ${caseReferenceSuffix} at [${paraNumber}]__/FOOTNOTE__</p>`;
  }

  throw new Error('unhandled format or citationStyle');
}
