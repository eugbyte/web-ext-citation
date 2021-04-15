export interface DOMImpl {
  getStartIndexOfCopiedText (targetElement: HTMLElement, parentFullText: string): number;
  traverseUpToElement (element: HTMLElement, nodeName: string, iteration?: number): HTMLElement;
}

export class DOMService implements DOMImpl {
  getStartIndexOfCopiedText (targetElement: HTMLElement, parentFullText: string): number {
    const childFullText: string = targetElement.innerText;
    const occurences = parentFullText.split(childFullText).length;
    if (occurences > 2) {
      console.log('Unable to process more than one matches');
      throw new Error('Unable to process more than one matches');
    }
    return parentFullText.indexOf(childFullText);
  }

  traverseUpToElement (element: HTMLElement, nodeName: string, iteration = 1): HTMLElement {
    if (!(element.nodeName === nodeName)) {
      return this.traverseUpToElement(element.parentElement as HTMLElement, nodeName, iteration + 1);
    }
    return element;
  }
}
