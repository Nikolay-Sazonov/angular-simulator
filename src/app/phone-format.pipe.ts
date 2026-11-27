import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number, mode: string = 'compact'): string {
    const cleanNumber = String(value).replace(/\D/g,'');
    if (!value) {
      return ''
    } else if (cleanNumber.length < 10) {
      return String(value);
    }

    const countryCode = cleanNumber.slice(0,2);
    const operatorCode = cleanNumber.slice(2,5);
    const restOfNumber = cleanNumber.slice(5);
    
    const p1 = restOfNumber.slice(0,3);
    const p2 = restOfNumber.slice(3,5);
    const p3 = restOfNumber.slice(5,7);

    switch (mode) {
      case 'compact' : return `+${cleanNumber}`;
      case 'international' : return `+${countryCode} ${operatorCode} ${p1} ${p2} ${p3}`;
      case 'national' : return `${operatorCode} ${p1} ${p2} ${p3}`;
      case 'masked' : return `+${countryCode} ${operatorCode} *** ** ${p3}`;
      default: return `+${cleanNumber}`;
    }
  }

}
