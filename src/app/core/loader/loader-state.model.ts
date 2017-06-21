export class LoaderState {
  private _count: number;
  show: boolean;

  get count(): number {
    return this._count;
  }
  set count(count: number) {
    this._count = count;
    this.show = count > 0;
  }

  constructor(count?: number) {
    this.count = count || 0;
  }
}
