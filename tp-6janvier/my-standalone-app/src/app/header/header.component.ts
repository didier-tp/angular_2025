import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  titre = input("titre_par_defaut"); //ou bien @Input()

  constructor(){
    console.log("dans constructor() de HeaderComponent , titre="+this.titre);
  }

  ngOnInit(){
    console.log("dans ngOnInit() de HeaderComponent , titre="+this.titre);
  }

}
