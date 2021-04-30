import { StringImpl } from 'src/services/string-service';

interface Services {
    stringService: StringImpl;
  }

export function getCaseDescription ({ stringService }: Services) {
  const caseName = (document.querySelector('.caseTitle') as HTMLElement).textContent as string;
  const dateCourtCaseNumber = (document.querySelector('.Citation.offhyperlink') as HTMLElement).textContent as string;
  let result = `${caseName} ${dateCourtCaseNumber}`;
  result = stringService.reduceWhiteSpacesExceptLineBreaks(result);
  return result.trim();
}
