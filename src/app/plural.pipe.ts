import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value:number | string | null | undefined, form1: string, form2: string, form3: string): string {

    const num = Math.abs(Number(value));
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (value === null || value === undefined) {
      return ''
    } else if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return form3;
    } else if (lastDigit === 1) {
      return form1;
    } else if (lastDigit >=2 && lastDigit <= 4) {
      return form2
    } else {
      return form3
    }
  }

}
