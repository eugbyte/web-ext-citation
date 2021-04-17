import cloneDeep from 'lodash.clonedeep';

export class ProvisionComponent {
  constructor (public index: number, public text: string) {}
  toString (): string {
    return `{ index: ${this.index}}, text: ${this.text} }`;
  }
}

export interface ProvisionImpl {
    sortProvComponentsByDescending (provisions: ProvisionComponent[]): ProvisionComponent[];
    splitFirstProvisionComponent (originalFirstComponent: ProvisionComponent): ProvisionComponent[];
}

export class ProvisionService implements ProvisionImpl {
  sortProvComponentsByDescending (provisions: ProvisionComponent[]): ProvisionComponent[] {
    const provisionsCopy = cloneDeep(provisions);
    provisionsCopy.sort((a, b) => b.index - a.index);
    return provisionsCopy;
  }

  // Need to seperate 15.—(1) into 15. and (1)
  splitFirstProvisionComponent (originalFirstComponent: ProvisionComponent): ProvisionComponent[] {
    const secondProvIndex = originalFirstComponent.index + originalFirstComponent.text.length;

    if (originalFirstComponent.text.includes('.—')) {
      const [firstProvText, secondProvText] = originalFirstComponent.text.split('.—');
      return [
        new ProvisionComponent(originalFirstComponent.index, firstProvText),
        new ProvisionComponent(secondProvIndex, `\n${secondProvText}`)
      ];
    } 

    if ( (/\d+\./).test(originalFirstComponent.text)) {
      const newFirstComponentText = originalFirstComponent.text.replace(".", "");
      return [
        new ProvisionComponent(originalFirstComponent.index, newFirstComponentText),
        new ProvisionComponent(secondProvIndex, "\n(-1)")
      ];
    }
    throw new Error("The first provision component did not contain either '.—' or . ");
  }

}
