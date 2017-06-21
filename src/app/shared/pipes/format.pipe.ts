import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  constants = {};

  transform(value: any, args?: any): any {
    const ids = this.constants[args];
    if (ids == null) {
      return null;
    }

    if (ids.hasOwnProperty(value)) {
      return ids[value];
    }

    if (typeof value === 'number') {
      const result = [];
      for (const key in ids) {
        if (ids.hasOwnProperty(key)) {
          const i = +key;
          if (i !== 0 && (i & value) === i) {
            if (!result.includes(ids[key])) {
              result.push(ids[key]);
            }
          }
        }
      }

      return result.join(', ');
    }

    return null;
  }

}
