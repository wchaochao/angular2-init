export class Page {
  // The number of elements in the page
  limit: number;
  // The total number of elements
  count: number;
  // The total number of pages
  pages: number;
  // The current page number
  offset: number;

  constructor(options: {
    limit?: number,
    count?: number,
    pages?: number,
    offset?: number,
    start?: number,
    length?: number
  } = {}) {
    if (options == null || options.start == null || options.length == null) {
      this.limit = options.limit || 10;
      this.offset = options.offset || 0;
    } else {
      this.limit = options.length;
      this.offset = options.start / options.length;
    }

    this.pages = options.pages || 0;
    this.count = options.count || 0;
  }
}
