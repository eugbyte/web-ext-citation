export interface RegexImpl {
    findMatches (regex: RegExp, text: string): RegExpMatchArray[];
    isBracketedAlpha (str: string): boolean;
    isBracketedRoman (str: string): boolean;
    isBracketedNumber (str: string): boolean;
    isNumber (str: string): boolean;
    titleCase (str: string): string;
    removeLineBreaks(str: string): string;
    getStartIndexOfCopiedText (childFullText: string, parentFullText: string): number;
    replaceTabsWithSpace(str: string): string;
    reduceLineBreaks(str: string): string;
    reduceWhiteSpacesExceptLineBreaks(str: string): string;
}

export class RegexService implements RegexImpl {
  findMatches (regex: RegExp, text: string): RegExpMatchArray[] {
    const matches = [...text.matchAll(regex)];
    return matches;
  }

  // E.g. (a)
  isBracketedAlpha (str: string): boolean {
    return /\([A-Z]+\)/i.test(str);
  }

  // E.g. (i), (iv)
  isBracketedRoman (str: string): boolean {
    const regex = /^\((M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))\)$/i;
    return regex.test(str);
  }

  // E.g. (2)
  isBracketedNumber (str: string): boolean {
    return /\(-?\d+\)/.test(str);
  }

  isNumber (str: string): boolean {
    return /^-?\d+$/.test(str);
  }
  
  titleCase (str: string): string {
    return str.replace(/\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });
  }

  replaceTabsWithSpace(str: string): string {
    return str.replace(/\t+|\f+|\v+|\0+/g, " ");
  }

  removeLineBreaks(str: string): string {
    return str.replace(/\n+/g, "");
  }

  reduceLineBreaks(str: string): string {
    return str.replace(/[\n\r]+/g, "\n");
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  reduceWhiteSpacesExceptLineBreaks(str: string): string {
    return str.replace(
      /[ \f\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/g,
      ' '
    )
  }

  getStartIndexOfCopiedText (childFullText: string, parentFullText: string): number {
    const occurences = parentFullText.split(childFullText).length;
    if (occurences > 2) {
      console.log('Unable to process more than one matches');
      throw new Error('Unable to process more than one matches');
    }
    return parentFullText.indexOf(childFullText);
  }
}
