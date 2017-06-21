import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';

import { LoaderService } from './loader/loader.service';
import { FlashMessageService } from './flash-message/flash-message.service';
import { RequestOptionsProvider, HttpServiceProvider } from './http/http-service.provider';
import { JsonHttpHelperService } from './http/json-http-helper.service';
import { ApiUrlService } from './config/api-url.service';
import { I18nService } from './i18n/i18n.service';
import { UsercpGuard } from './guards/usercp.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    FlashMessageComponent
  ],
  providers: [
    LoaderService,
    FlashMessageService,
    RequestOptionsProvider,
    HttpServiceProvider,
    JsonHttpHelperService,
    ApiUrlService,
    I18nService,
    UsercpGuard
  ],
  exports: [
    LoaderComponent,
    FlashMessageComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule Only');
    }
  }
}
