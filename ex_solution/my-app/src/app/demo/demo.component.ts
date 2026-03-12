import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../common/service/produit.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  valeurCurseur /*:number*/ =0;

  onChangeCurseur(event : any){
    const evt : {value:number} = event;
    this.valeurCurseur = evt.value;
  }

  nbProdPrixInferieurSeuilMaxi /*: number*/ = 0;

  actualiserNbProd(prixMaxi : number){
    this.produitService.rechercherNombreProduitSimu$(prixMaxi)
    .subscribe((nbProd) => { this.nbProdPrixInferieurSeuilMaxi = nbProd;});
  }

  constructor(private produitService  : ProduitService) {
    this.produitService.seuilMaxiObservable.subscribe(
      (nouveauSeuil)=>{ this.actualiserNbProd(nouveauSeuil);}
      );
   }

  ngOnInit(): void {
  }

}
