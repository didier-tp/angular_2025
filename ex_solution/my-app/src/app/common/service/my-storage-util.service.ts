import { Injectable } from '@angular/core';
import { inject, PLATFORM_ID } from "@angular/core";
import {  isPlatformBrowser, isPlatformServer  } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MyStorageUtilService {

  private readonly platform = inject(PLATFORM_ID);

  public setItemInLocalStorage(key:string, value: string | null | undefined){
    if (isPlatformBrowser(this.platform)) {
      // Safe to use document, window, localStorage, etc. :-)
      localStorage.setItem(key,value??"");
     }
   }

   public setItemInSessionStorage(key:string, value: string | null | undefined){
    if (isPlatformBrowser(this.platform)) {
      // Safe to use document, window, localStorage, etc. :-)
      sessionStorage.setItem(key,value??"");
     }
   }

   public getItemInLocalStorage(key:string):string|null{
    return isPlatformBrowser(this.platform)?localStorage.getItem(key):null
   }

   public getItemInSessionStorage(key:string):string|null{
    return isPlatformBrowser(this.platform)?sessionStorage.getItem(key):null
   }

  constructor() { }
}

/*
NB: avec angular 17+, pour ne pas être embêté avec localStorage 
il faut si besoin ajouter 
"ssr": false,  "prerender": false 
dans angular.json près des lignes 72,73
  "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "ssr": false, 
              "prerender": false 
            }

OU BIEN MIEUX ENCORE (si SSR est souhaité/utilisé), 

import { Component, inject, PLATFORM_ID } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";

export class AppComponent {
    private readonly platform = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);

    constructor() {
        if (isPlatformBrowser(this.platform)) {
            console.warn("browser");
            // Safe to use document, window, localStorage, etc. :-)
            console.log(document);
        }

        if (isPlatformServer(this.platform)) {
            console.warn("server");
            // Not smart to use document here, however, we can inject it ;-)
            console.log(this.document);
        }
    }
}

*/