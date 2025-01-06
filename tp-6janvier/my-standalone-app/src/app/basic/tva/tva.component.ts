import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tva',
  imports: [FormsModule, NgFor],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.scss'
})
export class TvaComponent {

  tauxPossibles = [ 5.0 , 10.0 , 20.0];

  ht /* number*/ = 0;
  taux /* number*/  = 0; //taux en %

  onCalculerTvaEtTtc(){
    this.tva = this.ht * this.taux / 100; 
    this.ttc = this.ht + this.tva;
  }

  tva /* number*/= 0;
  ttc /* number*/  = 0;

}
