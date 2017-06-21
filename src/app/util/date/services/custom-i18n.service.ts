import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { I18nService } from '../../../core/i18n/i18n.service';
import { I18N_VALUES } from '../config/i18n-values';

@Injectable()
export class CustomI18nService extends NgbDatepickerI18n {

  constructor(private i18n: I18nService) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this.i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

}
