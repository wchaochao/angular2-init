import { Component, OnInit, Input } from '@angular/core';

import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() addClass = 'bg-white';
  @Input() navs: Breadcrumb[] = [];

  constructor() { }

  ngOnInit() {
  }

}
