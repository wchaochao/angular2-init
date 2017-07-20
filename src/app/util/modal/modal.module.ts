import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModalModule.forRoot()
  ],
  declarations: [PreviewComponent],
  entryComponents: [PreviewComponent],
  exports: [PreviewComponent]
})
export class ModalModule { }
