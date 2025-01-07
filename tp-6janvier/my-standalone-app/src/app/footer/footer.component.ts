import { Component, inject } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule,NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  listeCouleurs : string[] = [ "lightyellow", "white",
    "lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ;

  public preferencesService = inject(PreferencesService) ;
}
