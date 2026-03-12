import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls:[ './header.component.scss']
})
export class HeaderComponent {

  titre = input("titre par defaut que j'aime")

  public preferencesService = inject(PreferencesService) ;

}
