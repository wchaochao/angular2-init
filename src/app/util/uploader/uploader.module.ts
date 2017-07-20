import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from '../modal/modal.module';

import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule
  ],
  declarations: [UploadImageComponent],
  exports: [UploadImageComponent]
})
export class UploaderModule { }
