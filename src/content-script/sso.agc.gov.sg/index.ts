import { getChapter } from "./getChapter";
import { getProvisions } from "./getProvisions";

export function getCitation(targetElement: HTMLElement): string {
  getChapter();

  return getProvisions(targetElement);
}


