export interface StringImpl {
    findMatches (regex: RegExp, text: string): RegExpMatchArray[];
    isBracketedAlpha (str: string): boolean;
    isBracketedRoman (str: string): boolean;
    isBracketedNumber (str: string): boolean;
    isHyphenNumberWithOptionalAlpha (str: string): boolean;
    isHyphenNumber (str: string): boolean;
    titleCase (str: string): string;
    removeLineBreaks(str: string): string;
    reduceLineBreaks(str: string): string;
    reduceWhiteSpacesExceptLineBreaks(str: string): string;
    unionStrings(str1: string, str2: string): string | void;
    getNumberWithSpaceSuffix(str: string): string | null;
    reduceWhiteSpaces (str: string): string;
    reduceWhiteSpaces (str: string): string;
    getCaseName(str: string): string | null;
    getCaseReferenceSuffix(str: string): string | null;
}

export class StringService implements StringImpl {
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

  isHyphenNumberWithOptionalAlpha (str: string): boolean {
    return /^-?\d+\w?/.test(str);
  }

  isHyphenNumber (str: string): boolean {
    return /^-?\d+$/.test(str);
  }

  getNumberWithSpaceSuffix (str: string): string | null {
    return (/\d+\s+/.exec(str) as RegExpExecArray)[0];
  }

  titleCase (str: string): string {
    return str.replace(/\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });
  }

  removeLineBreaks (str: string): string {
    return str.replace(/\n+/g, '');
  }

  reduceWhiteSpaces (str: string): string {
    return str.replace(/\s+/, ' ');
  }

  reduceLineBreaks (str: string): string {
    return str.replace(/[\n\r]+/g, '\n');
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  reduceWhiteSpacesExceptLineBreaks (str: string): string {
    // the whitespace at the front is important
    return str.replace(
      / +|[\f\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/g,
      ' '
    );
  }

  // ABC v PP
  getCaseName (str: string): string | null {
    const caseNameRegex = /[a-z ]+v[a-z ]+(?!\[)/i;
    const matches = caseNameRegex.exec(str);
    if (matches == null) return null;
    return matches[0];
  }

  // [2021] SGHC 102
  getCaseReferenceSuffix (str: string): string | null {
    const regex = /\[\d+\] .+\d/i;
    const matches = regex.exec(str);
    if (matches == null) return null;
    return matches[0];
  }

  // str1 = "apple pear orange"
  // str2 = "orange durian"
  // overlap = durian
  // str1 comes before str2
  private _findOverlap (str1: string, str2: string): string {
    let str2Copy = str2;
    let overlap = '';

    // slice from the end
    while (str2Copy.length > 0) {
      if (str1.includes(str2Copy)) {
        overlap = str2Copy;
        break;
      }
      str2Copy = str2Copy.slice(0, str2Copy.length - 1);
    }
    return overlap;
  }

  findOverlapText (str1: string, str2: string): string {
    const overlapText1: string = this._findOverlap(str1, str2);
    const overlapText2 = this._findOverlap(str2, str1);
    // for some reason, sort() without argument not working with "—" character
    const overlapText = [overlapText1, overlapText2].sort((a, b) => a.length - b.length);
    return overlapText[1];
  }

  unionStrings (str1: string, str2: string): string {
    const overlapText = this.findOverlapText(str1, str2);
    console.log('overlap:', overlapText);

    if (overlapText.length === 0) {
      console.log('no overlap found');
      throw new Error('No overlap found');
    }

    // Assumption is that:
    // str1 = unqiueText1 + common
    // str2 = common + uniqueText2
    if (str1.startsWith(overlapText)) {
      [str1, str2] = [str2, str1];
    }

    const endIndexOfOverlapInStr2 = overlapText.length;
    const str2WithoutOverlap: string = str2.substring(endIndexOfOverlapInStr2);
    return str1 + str2WithoutOverlap;
  }
}
