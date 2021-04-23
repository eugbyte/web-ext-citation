import { StringImpl, StringService } from 'src/services/string-service';

export function getChapter (): string {
  const regexService: StringImpl = new StringService();
  const nav = document.getElementById('tocNav') as HTMLElement;
  const span = nav.querySelector('span') as HTMLSpanElement;
  let chapter = span.innerText;
  // add a space before the "("
  chapter = chapter.replace(/\(/, ' (');
  return regexService.removeLineBreaks(chapter);
}
