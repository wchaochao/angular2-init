import { Injectable } from '@angular/core';
import { Response, RequestOptionsArgs, Headers } from '@angular/http';

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

  private appendHeader(args: RequestOptionsArgs) {
    const headers = args && args.headers;
    if (headers) {
      headers.append('Content-Type', 'application/json');
    }

    return args;
  }

  private process(observable: Observable<any>): Observable<any> {
    return observable.map(this.onMap);
  }

  get(url: string, args?: RequestOptionsArgs): Observable<any> {
    return this.process(this.http.get(url, this.appendHeader(args)));
  }

  delete(url: string, args?: RequestOptionsArgs): Observable<any> {
    return this.process(this.http.delete(url, this.appendHeader(args)));
  }

  post(url: string, body: any, args?: RequestOptionsArgs): Observable<any> {
    return this.process(this.http.post(url, JSON.stringify(body), this.appendHeader(args)));
  }

  put(url: string, body: any, args?: RequestOptionsArgs): Observable<any> {
    return this.process(this.http.put(url, JSON.stringify(body), this.appendHeader(args)));
  }

}
