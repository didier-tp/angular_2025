import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public preferencesService = inject(PreferencesService) ;

  titre = input("titre_par_defaut"); //ou bien @Input()

  constructor(){
    console.log("dans constructor() de HeaderComponent , titre="+this.titre);
  }

  ngOnInit(){
    console.log("dans ngOnInit() de HeaderComponent , titre="+this.titre);
  }

}
