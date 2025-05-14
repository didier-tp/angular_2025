import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','../common/style/common.scss']
})
export class HeaderComponent {

  @Input()
  titre = "titre_par_defaut"

}
