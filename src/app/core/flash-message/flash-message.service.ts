import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { FlashMessage } from './flash-message.model';

@Injectable()
export class FlashMessageService {

  private flashMessageSubject = new Subject<FlashMessage>();
  private message: FlashMessage;

  get flashMessage() {
    return this.flashMessageSubject.asObservable();
  }

  constructor() { }

  add(options?) {
    this.message = new FlashMessage(options);
    this.emit();
  }

  emit() {
    this.flashMessageSubject.next(Object.assign({}, this.message));
  }

}
