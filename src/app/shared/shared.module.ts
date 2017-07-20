import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { FrontFooterComponent } from './front-footer/front-footer.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ValidateFormatDirective } from './directives/validate-format.directive';
import { TrimValueDirective } from './directives/trim-value.directive';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { LongDatePipe } from './pipes/long-date.pipe';
import { FormatPipe } from './pipes/format.pipe';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    BreadcrumbComponent,
    FrontHeaderComponent,
    FrontFooterComponent,
    ClickOutsideDirective,
    ValidateFormatDirective,
    TrimValueDirective,
    ShortDatePipe,
    LongDatePipe,
    FormatPipe,
    KeysPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
    FrontHeaderComponent,
    FrontFooterComponent,
    ClickOutsideDirective,
    ValidateFormatDirective,
    TrimValueDirective,
    ShortDatePipe,
    LongDatePipe,
    FormatPipe,
    KeysPipe
  ]
})
export class SharedModule { }
