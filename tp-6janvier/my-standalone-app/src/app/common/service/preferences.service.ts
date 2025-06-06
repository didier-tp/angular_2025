import { inject, Injectable } from '@angular/core';
import { MyStorageUtilService } from './my-storage-util.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  //public couleurFondPreferee :string = 'lightgrey';

  readonly myStorageUtilService = inject(MyStorageUtilService);
  private _couleurFondPreferee: string;
  public get couleurFondPreferee() {
    return this._couleurFondPreferee;
  }
  public set couleurFondPreferee(c: string) {
    this._couleurFondPreferee = c;
    //localStorage.setItem('preferences.couleurFond', c);
    this.myStorageUtilService.setItemInLocalStorage('preferences.couleurFond',c);
  }
  constructor() {
    let c :string | null = this.myStorageUtilService.getItemInLocalStorage('preferences.couleurFond');
    //let c = localStorage.getItem('preferences.couleurFond');
    this._couleurFondPreferee = c ? c : 'lightgrey';
  }

  public add(a:number,b:number){
    return a+b;
  }
}
