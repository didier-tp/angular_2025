import { CommonModule, DecimalPipe, NgFor, NgIf, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed.pipe';
import { TvaService } from '../../common/service/tva.service';

@Component({
  selector: 'app-tva',
 imports: [FormsModule,NgFor,DecimalPipe,PercentPipe,ToFixedPipe],
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

  tvaService = inject(TvaService)
  /*
  onCalculerTvaTtcV1(){
    this.tva = this.ht * this.tauxTvaPct/100;
    this.ttc = Number(this.ht) + this.tva;
  }
  */

  onCalculerTvaTtc(){
    this.tva = this.tvaService.tva(this.ht,this.tauxTvaPct);
    this.ttc = this.tvaService.ttc(this.ht,this.tauxTvaPct);
  }

}
