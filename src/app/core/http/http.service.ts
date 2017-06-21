import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { DefaultRequestOptions } from './default-request.options';
import { LoaderService } from '../loader/loader.service';
import { FlashMessageService } from '../flash-message/flash-message.service';

@Injectable()
export class HttpService extends Http {

  constructor(
    backend: XHRBackend,
    defaultOptions: DefaultRequestOptions,
    private loaderService: LoaderService,
    private flashMessageService: FlashMessageService
  ) {
    super(backend, defaultOptions);
  }

  private addRequest() {
    this.loaderService.add();
  }

  private subRequest() {
    this.loaderService.sub();
  }

  private addMessage(options: RequestOptionsArgs, type: string) {
    const headers = options && options.headers;
    if (headers == null) {
      return;
    }

    const hasMessage = headers.has('message');
    if (hasMessage && headers.get('message')[type] != null) {
      this.flashMessageService.add({
        type: type,
        text: headers.get('message')[type]
      });
    }
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

  private onStart() {
    this.addRequest();
  }

  private onEnd() {
    this.subRequest();
  }

  private onSuccess(options: RequestOptionsArgs) {
    this.addMessage(options, 'success');
  }

  private onError(options: RequestOptionsArgs) {
    this.addMessage(options, 'danger');
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.onStart();

    return super.get(url, options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(options);
      }, (error: any) => {
        this.onError(options);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.onStart();

    return super.delete(url, options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(options);
      }, (error: any) => {
        this.onError(options);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.onStart();

    return super.post(url, body, options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(options);
      }, (error: any) => {
        this.onError(options);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.onStart();

    return super.put(url, body, options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(options);
      }, (error: any) => {
        this.onError(options);
      })
      .finally(() => {
        this.onEnd();
      });
  }

}
