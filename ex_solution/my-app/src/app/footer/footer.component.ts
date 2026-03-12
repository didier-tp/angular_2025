import { Component } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { SessionService } from '../common/service/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  today = new Date();
  username = "?"

  listeCouleurs : string[] = [ "lightyellow", "white",
   "lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ; 

constructor(public preferencesService : PreferencesService , 
           private _sessionService : SessionService) {
  //injection de dépendance par constructeur car dans @Component
  _sessionService.userInSession$.subscribe((userInSession)=>{
       if(userInSession.authenticated)
         this.username=userInSession.username;
        else
        this.username="?";
  })
 }
}
