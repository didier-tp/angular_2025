import { Component, effect, inject } from '@angular/core';
import { ProduitService, ProduitV2 } from '../../common/service/produit.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-prod',
  imports: [FormsModule],
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.scss']
})
export class ListProdComponent  {

  listeProduits : ProduitV2[]= [];

  produitService = inject(ProduitService) ;

  reactualiserListeProdEffect = effect(
    ()=>{
      const seuilQuiVientChanger = this.produitService.seuilMaxi();
      this.actualiserListeProduitSelonSeuilMaxi(seuilQuiVientChanger);
    }
  );

  actualiserListeProduitSelonSeuilMaxi(seuilMaxi : number){
    this.produitService.rechercherProduitSimu$(seuilMaxi)
        .subscribe((listP : ProduitV2[])=> { this.listeProduits = listP})
  
  }      

}
