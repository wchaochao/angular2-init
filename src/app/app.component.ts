import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigationInterceptor(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      this.loaderService.add();
    }

    if (event instanceof NavigationEnd) {
      this.loaderService.sub();
    }

    if (event instanceof NavigationCancel) {
      this.loaderService.sub();
    }

    if (event instanceof NavigationError) {
      this.loaderService.sub();
    }
  }

}
