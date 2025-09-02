import { CommonModule, DecimalPipe, NgFor, NgIf, PercentPipe } from '@angular/common';
import { Component, Signal, signal , computed, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed.pipe';

@Component({
  selector: 'app-tva',
  //imports: [FormsModule , DecimalPipe],
 imports: [FormsModule , CommonModule , ToFixedPipe],
 //imports: [FormsModule,CommonModule],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.scss'
})
export class TvaComponent {
  //ht : Signal<number> = signal(0); // ==> PROBLEME : component.ht.set(200) // DOES NOT COMPILE IN test class !!!!
  ht : WritableSignal<number> = signal(0);
  //ht = signal(0); //OK
  tauxTvaPct : WritableSignal<number> = signal(20);
  tva =computed(()=> this.ht() * this.tauxTvaPct() / 100.0);
  ttc =computed(()=> this.ht() * (1 + this.tauxTvaPct() / 100.0));

  tauxPossibles = [ 5, 10, 20];

}

