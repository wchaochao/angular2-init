import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidateFormat][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateFormatDirective,
      multi: true
    }
  ]
})
export class ValidateFormatDirective implements Validator, OnChanges {

  static formatRegexps = {
    int: /^\d+$/,
    telephone: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
    mobile: /^1[3|4|5|7|8|][0-9]{9}$/,
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    domain: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
    Ipv4: /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/,
    Ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
  };

  @Input() appValidateFormat;
  private valFn = Validators.nullValidator;

  static formatValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const isValid = regexp.test(value);
      return isValid ? null : { 'validateFormat': { value } };
    };
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['appValidateFormat'];
    if (change) {
      this.valFn = ValidateFormatDirective.formatValidator(ValidateFormatDirective.formatRegexps[change.currentValue]);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }

}
