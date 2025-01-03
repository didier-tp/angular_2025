import { Component, inject } from '@angular/core';
import { CalculService } from '../../common/service/calcul.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ToFixedPipe } from '../../common/pipe/to-fixed.pipe';
registerLocaleData(localeFr);

@Component({
  selector: 'app-tva',
  standalone: true,
  imports: [FormsModule, NgIf , NgFor , DecimalPipe , ToFixedPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.scss'
})
export class TvaComponent {
  listeTaux=[5,10,20];
    
  ht=0;
  taux=20;//en %
  tva=0;
  ttc=0;

  /*
  //version sans service
  onCalculerTvaTtc(){
    this.tva=this.taux/100 * this.ht;
    this.ttc = this.tva + this.ht;
  }
  */

  //version avec service
  private _calculService = inject(CalculService)
  onCalculerTvaTtc(){
    this.tva=this._calculService.calculTva(this.ht,this.taux);
    this.ttc = this._calculService.addition(this.tva , this.ht);
  }

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
