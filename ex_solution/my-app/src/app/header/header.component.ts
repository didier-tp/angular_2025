import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { SessionService } from '../common/service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit , OnChanges{
  isConnected /*: boolean*/ =false;

  @Input()
  titre = "titreParDefaut";

  constructor(public preferencesService : PreferencesService,
                     private _sessionService : SessionService  )  {
     console.log("dans constructeur de HeaderComponent , titre=" + this.titre);
     _sessionService.userInSession$.subscribe((userInSession)=>{
         this.isConnected = userInSession.authenticated;
       });
     }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges avec changes=" + JSON.stringify(changes));
  }

  ngOnInit(): void { console.log("dans ngOnInit() de HeaderComponent , titre=" + this.titre)
   }

}

