export interface DOMImpl {
  traverseUpToElement (element: HTMLElement, nodeName: string, iteration?: number): HTMLElement;
  copyNodeWithParentRef(node: HTMLElement): HTMLElement;
}

export class DOMService implements DOMImpl {
  copyNodeWithParentRef(targetElement: HTMLElement): HTMLElement {
    const cloneTarget = targetElement.cloneNode(true) as HTMLElement;
    cloneTarget.id = "clone";
    cloneTarget.style.display = "none";

    const parentElement = targetElement.parentElement as HTMLElement;
    parentElement.appendChild(cloneTarget);
    return cloneTarget;
  }

  traverseUpToElement (element: HTMLElement, nodeName: string, iteration = 1): HTMLElement {
    if (!(element.nodeName === nodeName)) {
      return this.traverseUpToElement(element.parentElement as HTMLElement, nodeName, iteration + 1);
    }
    return element;
  }

  


}
