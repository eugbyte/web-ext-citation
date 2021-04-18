import { getChapter } from "./getChapter";
import { getProvisions } from "./getProvisions";

export function getCitation(targetElement: HTMLElement): string {

  const parentElement = targetElement.parentElement as HTMLElement;
  const cloneTarget = targetElement.cloneNode(true) as HTMLElement;
  cloneTarget.id = "clone";
  cloneTarget.style.display = "none";
  parentElement.appendChild(cloneTarget);

  // For some reason, for certain provisions, the target element bubbles from the parent element instead of from the textNode 
  /* e.g. 
    <div>
      <textNode>Desired text</textNode>
      <table>unwanted text</table>
    </div>
  */
  // That means the inner text iwll contain text from the table
  try {
    const table = cloneTarget.querySelector("table") as HTMLTableElement;
    cloneTarget.removeChild(table);
  } catch (error) {
    console.log(error);
  }

  const provision = getProvisions(cloneTarget);
  parentElement.removeChild(cloneTarget);

  getChapter();

  return provision;
}


