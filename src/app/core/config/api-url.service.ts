import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlService {

  private root = 'http://localhost:55801/api';

  private urls = {
    domain: {
      usercp: '/domain',
      admin: '/domain'
    },
    command: {
      admin: '/command'
    }
  };

  constructor() { }

  getUrl(part: string, area: string): string {
    return this.root + this.urls[part][area];
  }

}
