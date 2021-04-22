import { StringImpl, StringService } from 'src/services/string-service';

export function getChapter (): string {
  const regexService: StringImpl = new StringService();
  const nav = document.getElementById('tocNav') as HTMLElement;
  const span = nav.querySelector('span') as HTMLSpanElement;
  const chapter = span.innerText;
  return regexService.removeLineBreaks(chapter);
}
