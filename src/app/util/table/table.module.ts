import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';

import { NgxDatatableExtendComponent } from './ngx-datatable-extend/ngx-datatable-extend.component';

@NgModule({
  imports: [
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [NgxDatatableExtendComponent],
  exports: [NgxDatatableExtendComponent]
})
export class TableModule { }
