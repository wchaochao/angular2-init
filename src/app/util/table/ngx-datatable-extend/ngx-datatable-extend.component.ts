import { Component, OnInit, OnDestroy, AfterContentInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatatableComponent, DataTableColumnDirective } from '@swimlane/ngx-datatable';

import { Observable, Subscription, Subject } from 'rxjs/Rx';

import { Page, TableData, TableQuery } from '../models/index';

declare const $: any;

@Component({
  selector: 'app-ngx-datatable-extend',
  templateUrl: './ngx-datatable-extend.component.html',
  styleUrls: ['./ngx-datatable-extend.component.css']
})
export class NgxDatatableExtendComponent implements OnInit, OnDestroy {
  @Input() columnMode = 'force';
  @Input() headerHeight = 38;
  @Input() footerHeight = 50;
  @Input() rowHeight = 'auto';
  @Input() messages = {
    emptyMessage: '没有相应的数据'
  };
  @Input() selectionType = 'checkbox';

  @Input() query = new TableQuery();
  page: Page;
  limits = [10, 20, 50, 100, 200];

  @Input() columns: Array<any>;
  @Input() switchFn: (query: TableQuery) => Observable<TableData<any>>;

  @Input() selected = [];
  @Output() selectedChange = new EventEmitter<Array<any>>();

  rows = [];
  subject = new Subject<TableQuery>();
  subscription: Subscription;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.page = new Page(this.query);

    this.subscription = this.subject.asObservable()
      .switchMap((query: TableQuery) => this.switchFn(query))
      .subscribe((tableData: TableData<any>) => {
        this.rows = tableData.data;
        this.resetPage(tableData.recordsTotal, this.page);

        if (this.rows.length === 0) {
          $(this.elementRef.nativeElement).find('.datatable-checkbox>input[type="checkbox"]').prop('disabled', true);
        } else {
          $(this.elementRef.nativeElement).find('.datatable-checkbox>input[type="checkbox"]').prop('disabled', false);
        }
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
    this.refresh();
  }

  getData() {
    this.onSelect({ selected: [] });

    const convert = new TableQuery(this.page);
    this.query = Object.assign(this.query, convert);
    this.subject.next(Object.assign({}, this.query));
  }

  search(others?) {
    if (others) {
      this.query = others;
    }
    this.page.offset = 0;
    this.getData();
  }

  refresh() {
    this.getData();
  }

  onSelect({ selected }) {
    this.selected = [...selected];
    this.selectedChange.emit(this.selected);
  }

}
