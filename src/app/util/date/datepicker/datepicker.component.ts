import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  private _model: any;
  get model(): any {
    return this._model;
  }
  set model(model: any) {
    this._model = model;
    this.dateChange.emit(this.date);
  }

  @Input() addClass = '';
  @Input() required = false;

  @Input()
  set date(date: any) {
    this._model = this.convertToModel(date);
  }
  get date(): any {
    return this.convertToDate(this._model);
  }


  @Output() dateChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  convertToModel(date: any): any {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(+date)) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    } else {
      return undefined;
    }
  }

  convertToDate(model: any): any {
    if (model instanceof Object) {
      return new Date(model.year, model.month - 1, model.day);
    } else {
      return null;
    }
  }


}
