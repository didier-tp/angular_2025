import { Component, input, model, output,  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reglette',
  imports:[FormsModule],
  templateUrl: './reglette.component.html',
  styleUrls: ['./reglette.component.scss']
})
export class RegletteComponent {

  gradient=model<boolean>(false); //avec dégradé de couleur

  width/*:string*/ = input("100"); //largeur paramétrage (100px par defaut)

  changeEvent  = output<number>();

  onInternalCurseur(event : Event){
       const evt : MouseEvent = <MouseEvent> event;
       const valX = evt.offsetX;
       const pctCurseur = (valX / Number(this.width())) * 100 ; //en %
       this.changeEvent.emit(pctCurseur);
  }

   onCheckedChange(){
      const valeurActuelle = this.gradient();
      const nouvelleValeurInversee =!valeurActuelle;
      this.gradient.set(nouvelleValeurInversee );
  }

  constructor() { }


}
