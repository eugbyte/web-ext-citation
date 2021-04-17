import { getChapter } from "./getChapter";
import { getProvisions } from "./getProvisions";

export function getCitation(targetElement: HTMLElement) {
  getChapter();

  return getProvisions(targetElement);
}


