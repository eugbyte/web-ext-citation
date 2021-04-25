export class CitationError extends Error {
  constructor (public message: string, public code = 500) {
    super(message);
  }

  toString () {
    return `${this.code} \n ${this.message}`;
  }
}
