import { StringImpl } from 'src/services/string-service';

interface Services {
  stringService: StringImpl;
}

export function getChapter ({ stringService }: Services): string {
  const nav = document.getElementById('tocNav') as HTMLElement;
  const span = nav.querySelector('span') as HTMLSpanElement;
  let chapter: string = span.innerText;
  // add a space before the "("
  chapter = chapter.replace(/\(/, ' (');
  return stringService.removeLineBreaks(chapter);
}
