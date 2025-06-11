import { CommonModule, DecimalPipe, NgFor, NgIf, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tva',
 imports: [FormsModule],
 //imports: [FormsModule,CommonModule],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.scss'
})
export class TvaComponent {
  ht : number = 0;
  tauxTvaPct : number = 20;
  tva : number = 0;
  ttc : number = 0;

  tauxPossibles = [ 5, 10, 20];

  onCalculerTvaTtc(){
    this.tva = this.ht * this.tauxTvaPct/100;
    this.ttc = Number(this.ht) + this.tva;
  }

mapTauxCategorieProd= new Map<number,string[]>();
tauxSel : number | undefined = undefined; //taux sélectionné
listeCategoriePourTauxSel = [];
constructor(){
this.mapTauxCategorieProd.set(20 , [ "services" ,"outils" , "objets"]);
this.mapTauxCategorieProd.set(10 , [ "transports" ,"hotels" , "restaurants" , "spectacles" , "médicaments"]);
this.mapTauxCategorieProd.set(5 , [ "aliments" ,"énergies" , "livres" ]);
}

onSelectTaux(taux:number){
  if(this.mapTauxCategorieProd.get(taux)){
         //this.listeCategoriePourTauxSel=this.mapTauxCategorieProd.get(taux);
    }
}

}
