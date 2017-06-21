import { RequestOptionsArgs, Headers } from '@angular/http';

export class ApiMessage {
  messages = {};

  getOptions(key: string) {
    const message = this.messages[key];

    return {
      headers: new Headers({
        message: message
      })
    };
  }
}
