import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  headers = new Headers({
    'Content-Type': 'application/json'
  });

}
