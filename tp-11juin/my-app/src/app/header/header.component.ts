import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls:[ './header.component.scss']
})
export class HeaderComponent {

  titre = input("titre par defaut que j'aime")

}
