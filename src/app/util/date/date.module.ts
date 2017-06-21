import { NgModule } from '@angular/core';
import { NgbDatepickerModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { DatepickerComponent } from './datepicker/datepicker.component';

import { CustomI18nService } from './services/custom-i18n.service';

@NgModule({
  imports: [
    SharedModule,
    NgbDatepickerModule.forRoot()
  ],
  declarations: [DatepickerComponent],
  providers: [
    {
      provide: NgbDatepickerI18n,
      useClass: CustomI18nService
    }
  ],
  exports: [DatepickerComponent]
})
export class DateModule { }
