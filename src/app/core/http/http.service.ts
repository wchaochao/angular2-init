import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { LoaderService } from '../loader/loader.service';
import { FlashMessageService } from '../flash-message/flash-message.service';

@Injectable()
export class HttpService extends Http {

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private loaderService: LoaderService,
    private flashMessageService: FlashMessageService
  ) {
    super(backend, defaultOptions);
  }

  private onStart() {
    this.loaderService.add();
  }

  private onEnd() {
    this.loaderService.sub();
  }

  private onCatch(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.toString()}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private addMessage(options: RequestOptionsArgs, type: string) {
    const headers = options && options.headers;
    if (!headers) {
      return;
    }

    const hasMessage = headers.has('message');
    if (hasMessage && headers.get('message')[type]) {
      this.flashMessageService.add({
        type: type,
        text: headers.get('message')[type]
      });
    }
  }

  private onSuccess(options: RequestOptionsArgs) {
    this.addMessage(options, 'success');
  }

  private onError(options: RequestOptionsArgs) {
    this.addMessage(options, 'danger');
  }

  private process(observable: Observable<any>, options: RequestOptionsArgs): Observable<any> {
    this.onStart();

    return observable.catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(options);
      }, (error: any) => {
        this.onError(options);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.process(super.get(url, options), options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.process(super.delete(url, options), options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.process(super.post(url, body, options), options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.process(super.put(url, body, options), options);
  }

}
