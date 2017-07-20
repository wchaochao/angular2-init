import { FileStatus } from '../enums/index';

export class File {
  id: string | number;
  name: string;
  status?: FileStatus;
  percentage?: string;
  filepath: string;
  url: string;

  constructor(options: {
    id?: string | number,
    name?: string,
    status?: FileStatus,
    percentage?: string,
    filepath?: string,
    url?: string;
  } = {}) {
    this.id = options.id || '';
    this.name = options.name || '';
    this.status = options.status || FileStatus.inited;
    this.percentage = options.percentage || '0%';
    this.filepath = options.filepath || '';
    this.url = options.url || '';
  }

  reset(options: {
    id: number,
    filepath: string
  }) {
    this.id = options.id;
    this.filepath = options.filepath;
    this.name = options.filepath.split('/').reverse()[0];
    this.status = FileStatus.complete;
    this.percentage = '100%';
  }
}
