export class TableQuery {
  start: number;
  length: number;

  constructor(options: {
    start?: number,
    length?: number,
    limit?: number,
    offset?: number
  } = {}) {
    if (options == null || options.limit == null || options.offset == null) {
      this.start = options.start || 0;
      this.length = options.length || 10;
    } else {
      this.start = options.limit * options.offset;
      this.length = options.limit;
    }
  }
}
