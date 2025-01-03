import { Injectable } from '@angular/core';
import { Devise } from '../data/devise';
import { Observable, of } from 'rxjs';
import { delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


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

 constructor(private http: HttpClient){
 }

  public getAllDevises$() : Observable<Devise[]>{
     const url = `${this.publicBaseUrl}/devises`;
     console.log( "url = " + url);
     return this.http.get<Devise[]>(url)
     .pipe(
         map( tabDevises => tabDevises.sort((d1,d2) => d1?d1.code.localeCompare(d2.code):0)) 
     );
  }

  public getDeviseByCode$(code:string) : Observable<Devise>{
    const url = `${this.publicBaseUrl}/devises/${code}`;
    console.log( "url = " + url);
    return this.http.get<Devise>(url);
  }


  public deleteDevise$(deviseCode : string):Observable<any>{
    const url = `${this.publicOrPrivateBaseUrl}/devises/${deviseCode}?v=true`;
    console.log("deleteUrl=" + url );
    return this.http.delete<any>(url);
  }

  postDevise$(d :Devise): Observable<Devise>{
    const url = `${this.publicOrPrivateBaseUrl}/devises`;
    return this.http.post<Devise>(url,d /*input envoyé au serveur*/);
    //this.http.post<TypeReponseRetourneParServeur>(url_web_service , donnee_a_envoyer)
  }

  putDevise$(d :Devise): Observable<Devise>{
    const deviseCode = d.code;
    const url = `${this.publicOrPrivateBaseUrl}/devises/${deviseCode}?v=true`; 
    return this.http.put<Devise>(url,d /*input envoyé au serveur*/);
    //this.http.put<TypeReponseRetourneParServeur>(url_web_service , donnee_a_envoyer)
  }

  public convertir$(montant: number,
                   codeDeviseSrc : string, 
                   codeDeviseTarget : string
                   ) : Observable<number> {                    
    let url = this.publicBaseUrl 
    + `/convert?source=${codeDeviseSrc}&target=${codeDeviseTarget}&amount=${montant}`;
    console.log("url="+url);
  
    return this.http.get<ConvertRes>(url).pipe(
      map((convertRes) => convertRes.result)
    );
    
  }

}

/*
V1 simulée:

//jeux de données (en dur) pour pré-version (simulation asynchrone)
  private devises : Devise[] = [
    new Devise('EUR','euro',1.0),
    new Devise('USD','dollar',1.1),
    new Devise('GBP','livre',0.9)
  ];

  public getAllDevises$() : Observable<Devise[]>{
      return of(this.devises) //version préliminaire (cependant asynchrone)
            .pipe(
               delay(111) //simuler une attente de 111ms 
            );
  }

  public convertir$(montant: number,
                   codeDeviseSrc : string, 
                   codeDeviseTarget : string
                   ) : Observable<number> {
      let coeff =  Math.random();//coefficient aleatoire ici (simple simulation)
      let montantConverti = montant * coeff;                    
      return of(montantConverti) //version temporaire (cependant asynchrone)
            .pipe(
                 delay(222) //simuler une attente de 222ms 
            );
  }
*/