import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tva',
  imports: [FormsModule,NgFor,NgIf],
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

}
