import { Directive, HostListener, forwardRef } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The trim accessor for writing trimmed value and listening to changes that is
 * used by the {@link NgModel}, {@link FormControlDirective}, and
 * {@link FormControlName} directives.
 */
@Directive({
  selector: 'input:not([type=checkbox]):not([type=radio]):not([type=password])[formControlName],' +
  'input:not([type=checkbox]):not([type=radio]):not([type=password])[formControl],' +
  'input:not([type=checkbox]):not([type=radio]):not([type=password]):not([ngbDatepicker])[ngModel],' +
  'textarea[formControlName],' +
  'textarea[formControl],' +
  'textarea[ngModel],' +
  '[ngDefaultControl]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrimValueDirective),
    multi: true
  }]
})
export class TrimValueDirective extends DefaultValueAccessor {

  @HostListener('input', ['$event.target.value'])
  ngOnChange = (val: string) => {
    this.onChange(val.trim());
  }

  writeValue(value: any): void {
    if (typeof value === 'string') {
      value = value.trim();
    }

    super.writeValue(value);
  }

}
