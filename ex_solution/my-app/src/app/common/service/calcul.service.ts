import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  constructor() { }

  public calculTva(ht:number,tauxTvaPct:number){
    return ht * tauxTvaPct/100;
  }

  public addition(a:number,b:number){
    return Number(a)+Number(b);
  }
}
