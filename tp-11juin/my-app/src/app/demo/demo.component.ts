import { Component, effect, inject } from '@angular/core';
import { ProduitService } from '../common/service/produit.service';
import { RegletteComponent } from './reglette/reglette.component';
import { ZzComponent } from './zz/zz.component';
import { SimpleSelectorComponent } from './simple-selector/simple-selector.component';
import { FormsModule } from '@angular/forms';
import { ListProdComponent } from './list-prod/list-prod.component';
import { SeuilComponent } from './seuil/seuil.component';

@Component({
  selector: 'app-demo',
  imports:[FormsModule,RegletteComponent,SimpleSelectorComponent,ZzComponent,
           SeuilComponent,ListProdComponent],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent  {

  valeurCurseur /*:number*/ =0;
  avecDegradeCouleur=false;

  onChangeCurseur(eventValue : number){
    this.valeurCurseur = eventValue;
  }

  //couleurChoisie : string|null = null;
  couleurChoisie : string|null = "green"; // "green" par défaut dans le sens imput de choix=model() 

   //pour version événementielle choix=output() , (choix)="onChoixCouleur($event)"
  onChoixCouleur(valCouleurChoisie:string){
      this.couleurChoisie=valCouleurChoisie;
  }

  //pour version bidirectionnelle choix=model(), (choixChange)="onChoixCouleurChange()"
  onChoixCouleurChange(){
    console.log("nouveau choix:"+this.couleurChoisie)
  }

  onGradientChange(){
    console.log("nouvelle valeur de avecDegradeCouleur="+this.avecDegradeCouleur);
  }

  produitService  = inject(ProduitService);
 
  nbProdPrixInferieurSeuilMaxi = 0;

  actualiserNbProd(prixMaxi : number){
    this.produitService.rechercherNombreProduitSimu$(prixMaxi)
    .subscribe((nbProd) => { this.nbProdPrixInferieurSeuilMaxi = nbProd;});
  }

  

   reactualiserNbProdEffect = effect(
    ()=>{
      const nouveauSeuil = this.produitService.seuilMaxi();
      this.actualiserNbProd(nouveauSeuil);
    }
  );

 

}
