import { Injectable } from '@angular/core';
import { Observable, of, delay, mergeMap, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EssaiService {

  public getCountryNameByCode$(code:string): Observable<string> {
    let res="?";
    switch(code){
      case "fr" : res = "France" ; break;
      case "de" : res = "Allemagne" ; break;
      case "es" : res = "Espagne" ; break;
      case "it" : res = "Italie" ; break;
      case "gb" : res = "GrandeBretagne" ; break;
    }
    return of(res) //version préliminaire (cependant asynchrone)
      .pipe(
        delay(111) //simuler une attente de 111ms
      );
  }

  public getCapitalCityFromCountryName$(name:string): Observable<string> {
    let res="?";
    switch(name){
      case "France" : res = "Paris" ; break;
      case "Allemagne" : res = "Berlin" ; break;
      case "Espagne" : res = "Madrid" ; break;
      case "Italie" : res = "Rome" ; break;
      case "GrandeBretagne" : res = "Londres" ; break;
    }
    return of(res) //version préliminaire (cependant asynchrone)
      .pipe(
        delay(111) //simuler une attente de 111ms
      );
  }

  public getCapitalCityFromCountryCode$(code:string): Observable<string> {
    return this.getCountryNameByCode$(code).pipe(
      tap( (countyName) => console.log("getCountryNameByCode$() called with code=" + code + " countryName="+countyName)),
      mergeMap( (countryName)=> this.getCapitalCityFromCountryName$(countryName))
    );
  }

  constructor() { }
}
