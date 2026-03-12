import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-simple-selector',
  imports: [],
  templateUrl: './simple-selector.component.html',
  styleUrl: './simple-selector.component.scss'
})
export class SimpleSelectorComponent {
    title=input("SimpleSelector") //titre paramétrable avec valeur par défaut

    values = input<string[]>([]) //valeurs à choisir

    choix=model<string|null>() //choix (bidirectionnel)

    onInternalChoice(v:string){
       this.choix.set(v);//changement de la valeur du signal de type model()
    }
}


