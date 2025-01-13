import { Injectable } from '@angular/core';

//NB: if providedIn: null , Service will not be automatically registered in root injector
//this service should be explicitly registered in providers:[] part
//of a component (dangerous : not shared) , or a route config of a subpart of app
@Injectable({
  providedIn: null
})
export class CalculService {

  private _counter = 0;

  public add(a:number,b:number):number{
    this._counter++;
    console.log("CalculService add , _counter="+this._counter)
    return a+b;
  }

  constructor() {
    console.log("CalculService constructor , _counter="+this._counter)
   }
}
