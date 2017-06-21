import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { LoaderState } from './loader-state.model';

@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  private state = new LoaderState();

  get loaderState(): Observable<LoaderState> {
    return this.loaderSubject.asObservable();
  }

  constructor() { }

  add() {
    this.state.count++;
    this.emit();
  }

  sub() {
    this.state.count--;
    this.emit();
  }

  emit() {
    this.loaderSubject.next(Object.assign({}, this.state));
  }

}
