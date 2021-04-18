import { getChapter } from "./getChapter";
import { getProvisions } from "./getProvisions";

export function getCitation(targetElement: HTMLElement): string {

  const parentElement = targetElement.parentElement as HTMLElement;
  const cloneTarget = targetElement.cloneNode(true) as HTMLElement;
  cloneTarget.id = "clone";
  cloneTarget.style.display = "none";
  parentElement.appendChild(cloneTarget);

  // For some reason, for the first provisions, e.g. 14(1), 15(1), 15. 
  // The target element bubbles from the parent element instead of from the textNode 
  /* e.g. bubble from div instead of textNode
    <div>
      <textNode>Desired text</textNode>
      <table>unwanted text</table>
    </div>
  */
  // That means the inner text will contain text from the table
  const table = cloneTarget.querySelector("table") as HTMLTableElement;
  if (table) cloneTarget.removeChild(table);
  
  const provision = getProvisions(cloneTarget);
  parentElement.removeChild(cloneTarget);

  getChapter();

  return provision;
}


