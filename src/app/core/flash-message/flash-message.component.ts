import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { FlashMessage } from './flash-message.model';
import { FlashMessageService } from './flash-message.service';
import { flashInOut } from '../../animations/flash-in-out';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css'],
  animations: [flashInOut]
})
export class FlashMessageComponent implements OnInit, OnDestroy {

  messages: FlashMessage[] = [];
  config = {
    timeout: 3000,
    maxLength: 3
  };

  private subscription: Subscription;

  constructor(private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.subscription = this.flashMessageService.flashMessage
      .subscribe((message: FlashMessage) => {
        this.messages.unshift(message);
        setTimeout(() => {
          this.remove(message);
        }, this.config.timeout);

        this.fixedLength();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fixedLength() {
    if (this.messages.length > this.config.maxLength) {
      this.messages.pop();
    }
  }

  remove(message: FlashMessage) {
    const index = this.messages.indexOf(message);
    this.messages.splice(index, 1);
  }

}
