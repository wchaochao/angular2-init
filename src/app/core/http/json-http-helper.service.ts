import { Injectable } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';

@Injectable()
export class JsonHttpHelperService {

  constructor(private http: HttpService) { }

  private onMap(response: Response) {
    const res = response.json();
    return res;
  }

  get(url: string, args?: RequestOptionsArgs): Observable<any> {
    return this.http
      .get(url, args)
      .map(this.onMap);
  }

  delete(url: string, args?: RequestOptionsArgs): Observable<any> {
    return this.http
      .delete(url, args)
      .map(this.onMap);
  }

  post(url: string, body: any, args?: RequestOptionsArgs): Observable<any> {
    return this.http
      .post(url, JSON.stringify(body), args)
      .map(this.onMap);
  }

  put(url: string, body: any, args?: RequestOptionsArgs): Observable<any> {
    return this.http
      .put(url, JSON.stringify(body), args)
      .map(this.onMap);
  }

}
