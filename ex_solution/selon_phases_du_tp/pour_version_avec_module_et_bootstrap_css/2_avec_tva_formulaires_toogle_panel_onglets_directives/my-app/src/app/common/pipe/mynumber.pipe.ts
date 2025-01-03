import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mynumber'
})
export class MynumberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let arg0 = <string> args[0];
    //ex: arg0='1.0-2'
    let partiesDeArg0 = arg0.split('-'); //string[]
    let nbMaxFractionDigits = Number(partiesDeArg0[1]); //partie après le "-"
    return Number(value).toFixed(nbMaxFractionDigits);
  }

}
