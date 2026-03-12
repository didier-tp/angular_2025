import { Injectable } from '@angular/core';
import { Devise } from '../data/devise';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';


export interface ConvertRes {
  source :string; //ex: "EUR",
  target :string; //ex: "USD",
  amount :number; //ex: 200.0
  result :number; //ex: 217.3913
};


@Injectable({
  providedIn: 'root'
})
export class DeviseService {

  private _withoutSecurity = false; 

  public set withoutSecurity(value:boolean){
    this._withoutSecurity=value;
    this.publicOrPrivateBaseUrl=this._withoutSecurity?this.publicBaseUrl:this.privateBaseUrl;
  }

  public get  withoutSecurity():boolean{
    return this._withoutSecurity;
  }
  //full baseUrl = "https://www.d-defrance.fr/tp/devise-api/v1/public or private";
  //_apiBaseUrl ="https://www.d-defrance.fr/tp/devise-api/v1";
  //_apiBaseUrl ="http://localhost:8233/devise-api/v1"

  _apiBaseUrl ="/tp/devise-api/v1"; //with ng serve --proxy-config proxy.conf.json
  publicBaseUrl = `${this._apiBaseUrl}/public`;
  privateBaseUrl = `${this._apiBaseUrl}/private`;
  publicOrPrivateBaseUrl : string =this.privateBaseUrl; //with security by default


  constructor(private _http : HttpClient){}

  public getAllDevises$() : Observable<Devise[]>{
    let url = this._apiBaseUrl + "/public/devises" ;
    console.log( "url = " + url);
    return this._http.get<Devise[]>(url)
    .pipe(
      map( tabDevises => tabDevises.sort((d1,d2) => d1?d1.code.localeCompare(d2.code):0)) 
    );
  }

  public getDeviseByCode$(code:string) : Observable<Devise>{
    const url = `${this.publicBaseUrl}/devises/${code}`;
    console.log( "url = " + url);
    return this._http.get<Devise>(url);
  }


  public deleteDevise$(deviseCode : string):Observable<any>{
    const url = `${this.publicOrPrivateBaseUrl}/devises/${deviseCode}?v=true`;
    console.log("deleteUrl=" + url );
    return this._http.delete<any>(url);
  }

  postDevise$(d :Devise): Observable<Devise>{
    const url = `${this.publicOrPrivateBaseUrl}/devises`;
    return this._http.post<Devise>(url,d /*input envoyé au serveur*/);
    //this.http.post<TypeReponseRetourneParServeur>(url_web_service , donnee_a_envoyer)
  }


  public convertir$(montant: number,
                   codeDeviseSrc : string, 
                   codeDeviseTarget : string
                   ) : Observable<number> {

      const url = this._apiBaseUrl + "/public/convert" 
         + `?source=${codeDeviseSrc}`
         + `&target=${codeDeviseTarget}&amount=${montant}` ;
      //console.log( "url = " + url);
      return this._http.get<ConvertRes>(url)
            .pipe(
              map( (res:ConvertRes) => res.result)
            );
  }

  putDevise$(d :Devise): Observable<Devise>{
    const url = `${this.publicOrPrivateBaseUrl}/devises/${d.code}?v=true`; 
    //const url = `${this._apiBaseUrl}/private/devises/${d.code}?v=true`; 
    return this._http.put<Devise>(url,d /*input envoyé au serveur*/);
  }
}