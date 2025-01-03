import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mynumber'
})
export class MynumberPipe implements PipeTransform {

  //ex: {{ tva | mynumber:'1.0-2' }}
  transform(value: unknown, ...args: unknown[]): unknown {
    let val = <number> value ;
    let format = <string> args[0] || '1.0-2'; //version simplifiée
    let nbDigit = Number( format.split("-")[1] );
    return val.toFixed(nbDigit);
  }

}
