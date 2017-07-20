import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiUrlService {

  private root = environment.production ? '' : 'http://localhost:55801';

  private urls = {
    domain: {
      usercp: '/api/domain',
      admin: '/api/domain'
    }
  };

  constructor() { }

  getUrl(part: string, area?: string): string {
    if (!area) {
      return this.root + this.urls[part];
    } else {
      return this.root + this.urls[part][area];
    }
  }

}
