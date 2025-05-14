import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','../common/style/common.scss']
})
export class HeaderComponent {

  @Input()
  titre = "titre_par_defaut"


  constructor(public preferencesService : PreferencesService) { console.log("dans constructeur de HeaderComponent , titre=" + this.titre)
}
ngOnInit(): void { console.log("dans ngOnInit() de HeaderComponent , titre=" + this.titre)
}
}
