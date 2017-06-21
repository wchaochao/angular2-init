import { Component, OnInit, OnDestroy, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { DatatableComponent, DataTableColumnDirective } from '@swimlane/ngx-datatable';

import { Observable, Subscription, Subject } from 'rxjs/Rx';

import { Page, TableData, TableQuery } from '../models/index';

@Component({
  selector: 'app-ngx-datatable-extend',
  templateUrl: './ngx-datatable-extend.component.html',
  styleUrls: ['./ngx-datatable-extend.component.css']
})
export class NgxDatatableExtendComponent implements OnInit, OnDestroy {
  @Input() columnMode = 'force';
  @Input() headerHeight = 37;
  @Input() footerHeight = 50;
  @Input() rowHeight = 'auto';
  @Input() messages = {
    emptyMessage: '没有相应的数据'
  };

  query = new TableQuery();
  page = new Page(this.query);
  limits = [10, 20, 50, 100, 200];

  @Input() columns: Array<any>;
  @Input() switchFn: (query: TableQuery) => Observable<TableData<any>>;

  rows = [];
  subject = new Subject<TableQuery>();
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.subject.asObservable()
      .switchMap((query: TableQuery) => this.switchFn(query))
      .subscribe((tableData: TableData<any>) => {
        this.rows = tableData.data;
        this.resetPage(tableData.recordsTotal, this.page);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetPage(count: number, page: Page) {
    page.count = count;
    page.pages = Math.ceil(count / page.limit);
  }

  setPage(pageInfo) {
    this.page.offset = pageInfo.offset;
    this.getData();
  }

  getData(others?) {
    const convert = new TableQuery(this.page);
    this.query = Object.assign(this.query, others, convert);
    this.subject.next(Object.assign({}, this.query));
  }

  search(others?) {
    this.page.offset = 0;
    this.getData(others);
  }

  refresh() {
    this.getData();
  }

}
