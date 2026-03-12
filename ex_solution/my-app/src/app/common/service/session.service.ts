import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInSession } from '../data/user_in_session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private bsUserInSession = new BehaviorSubject<UserInSession>( new UserInSession());

  public get userInSession$() : Observable<UserInSession>{
    return this.bsUserInSession;
  }

  public set userInSession$(u:UserInSession) {
    this.bsUserInSession.next(u);//NB: ça va automatiquement redéclencher toutes les callbacks
    //enregistrées via .subscribe() dans divers composants
  }

  constructor() { }
}
