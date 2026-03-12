import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
   let val = <number> value;
    let nbPrecision = <number> args[0] || 2;
    return val.toFixed(nbPrecision);
  }

}
