import { Component, inject } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

listeCouleurs : string[] = [ "lightyellow", "white",
"lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ;

//injection moderne via inject()
public preferencesService = inject(PreferencesService) ;

/*
//ancienne injection par constructeur 
constructor(public preferencesService : PreferencesService) { }
*/

}
