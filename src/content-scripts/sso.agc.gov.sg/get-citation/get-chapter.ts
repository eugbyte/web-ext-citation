import { StringImpl } from 'src/services/string-service';
import startCase from 'lodash.startcase';

interface Services {
  stringService: StringImpl;
}

export function getChapter ({ stringService }: Services): string {
  let chapter = (document.getElementById('aT-') as HTMLElement).innerText;
  // add a space before the "("
  chapter = chapter.replace(/\(/, ' (');
  chapter = startCase(chapter.toLowerCase());
  console.log({chapter});

  const actNumber = (document.querySelector(".actNo") as HTMLElement).innerText;
  const fullChapter = `${chapter} ${actNumber}`;
  return stringService.removeLineBreaks(fullChapter);
}
