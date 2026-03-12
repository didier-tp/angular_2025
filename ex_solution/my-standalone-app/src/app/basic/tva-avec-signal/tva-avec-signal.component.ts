import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed.pipe';

@Component({
  selector: 'app-tva-avec-signal',
  standalone: true,
  imports: [FormsModule,ToFixedPipe],
  templateUrl: './tva-avec-signal.component.html',
  styleUrl: './tva-avec-signal.component.scss'
})
export class TvaAvecSignalComponent {
  //ht : Signal<number> = signal(0); // ==> PROBLEME : component.ht.set(200) // DOES NOT COMPILE IN test class !!!!
  //ht : WritableSignal<number> = signal(0); //ok
  ht = signal<number>(0); //OK
  //tauxTvaPct : WritableSignal<number> = signal(20);
  tauxTvaPct = signal<number>(20); //OK
  tva =computed(()=> this.ht() * this.tauxTvaPct() / 100.0);
  ttc =computed(()=> this.ht() * (1 + this.tauxTvaPct() / 100.0));

  tauxPossibles = [ 5, 10, 20];
}
