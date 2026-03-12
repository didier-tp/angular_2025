import { Component, inject } from '@angular/core';
import { ProduitService } from '../../common/service/produit.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-seuil',
  imports: [FormsModule],
  templateUrl: './seuil.component.html',
  styleUrls: ['./seuil.component.scss']
})
export class SeuilComponent  {

  public seuilMax=100; //à saisir

  produitService = inject(ProduitService) ;

  onSeuilChange(){
    this.produitService.changerSeuil(this.seuilMax);
  }




}
