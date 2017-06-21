import { XHRBackend, RequestOptions } from '@angular/http';
import { DefaultRequestOptions } from './default-request.options';
import { LoaderService } from '../loader/loader.service';
import { FlashMessageService } from '../flash-message/flash-message.service';
import { HttpService } from './http.service';

export function httpServiceFactory(backend: XHRBackend, options: DefaultRequestOptions
  , loaderService: LoaderService, flashMessageService: FlashMessageService) {
  return new HttpService(backend, options, loaderService, flashMessageService);
}

export const RequestOptionsProvider = {
  provide: RequestOptions,
  useClass: DefaultRequestOptions
};

export const HttpServiceProvider = {
  provide: HttpService,
  useFactory: httpServiceFactory,
  deps: [XHRBackend, RequestOptions, LoaderService, FlashMessageService]
};
