export interface RegexImpl {
    findMatches (regex: RegExp, text: string): RegExpMatchArray[];
    isBracketedAlpha (str: string): boolean;
    isBracketedRoman (str: string): boolean;
    isBracketedNumber (str: string): boolean;
    isNumber (str: string): boolean;
    titleCase (str: string): string;
    removeLineBreaks(str: string): string;
    getStartIndexOfCopiedText (childFullText: string, parentFullText: string): number;
    reduceLineBreaks(str: string): string;
    reduceWhiteSpacesExceptLineBreaks(str: string): string;
    unionStrings(str1: string, str2: string): string | void;
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
    );
  }

  getStartIndexOfCopiedText (childFullText: string, parentFullText: string): number {
    const occurences = parentFullText.split(childFullText).length;
    if (occurences > 2) {
      console.log('Unable to process more than one matches');
      throw new Error('Unable to process more than one matches');
    }
    return parentFullText.indexOf(childFullText);
  }

  // str1 = "apple pear orange"
  // str2 = "orange durian"
  // overlap = durian
  // str1 comes before str2
  private _findOverlap(str1: string, str2: string): string {
    let str2Copy = str2;
    let overlap = "";

    // slice from the end
    console.log("slicing str2 from end");
    while (str2Copy.length > 0) {
        if (str1.includes(str2Copy)) {
            overlap = str2Copy;
            console.log(`overlap: ${overlap}`);
            break;
        }
        str2Copy = str2Copy.slice(0, str2Copy.length - 1);
    }
    return overlap; 
  }

  findOverlapText(str1: string, str2: string): string {
    const overlapText1: string = this._findOverlap(str1, str2);
    const overlapText2 = this._findOverlap(str2, str1);
    const overlapText = ([overlapText1, overlapText2].sort())[1];
    return overlapText;
  }

  unionStrings(str1: string, str2: string): string {
    const overlapText = this.findOverlapText(str1, str2);

    if (overlapText.length === 0) {
      console.log("no overlap found");
      throw new Error("No overlap found");
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
