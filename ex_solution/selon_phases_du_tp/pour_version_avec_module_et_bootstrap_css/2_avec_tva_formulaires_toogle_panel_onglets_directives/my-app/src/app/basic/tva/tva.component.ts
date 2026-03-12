import { Component } from '@angular/core';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.scss'
})
export class TvaComponent {
  listeTaux=[5,10,20];
    
  ht=0;
  taux=20;//en %
  tva=0;
  ttc=0;

  
  onCalculerTvaTtc(){
    this.tva=this.taux/100 * this.ht;
    this.ttc = this.tva + this.ht;
  }

//pour suite faculative du tp:

  mapTauxCategorieProd= new Map<number,string[]>();
  tauxSel : number | undefined = undefined; //taux sélectionné
  listeCategoriePourTauxSel : string[] = [];
  constructor(){
    this.mapTauxCategorieProd.set(20 , [ "services" ,"outils" , "objets"]);
    this.mapTauxCategorieProd.set(10 , [ "transports" ,"hotels" , "restaurants" , "spectacles" , "médicaments"]);
    this.mapTauxCategorieProd.set(5 , [ "aliments" ,"énergies" , "livres" ]);
  }

  onSelectTaux(t:number){
    this.tauxSel=t;
    this.listeCategoriePourTauxSel=this.mapTauxCategorieProd.get(t)??[];
  }

}
