import { StringImpl } from 'src/services/string-service';

interface Services {
    stringService: StringImpl
}

export function getParagraphNumber (targetElement: HTMLElement, { stringService }: Services): string | null {
  const fullText: string = targetElement.innerText;
  console.log(fullText);
  let paraNum: string | null = stringService.getNumberWithSpaceSuffix(fullText);
  if (paraNum == null) return null;
  paraNum = stringService.reduceWhiteSpaces(paraNum);
  return paraNum.trim();
}
