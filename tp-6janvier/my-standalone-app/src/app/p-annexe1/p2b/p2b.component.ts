import { Component, inject } from '@angular/core';
import { CalculService } from '../common/service/calcul.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p2b',
  imports: [FormsModule],
  templateUrl: './p2b.component.html',
  styleUrl: './p2b.component.scss'
})
export class P2bComponent {
a=2;
  b=3;
  res=0;

  private _calculService = inject(CalculService);
  public onAdd(){
     this.res=this._calculService.add(this.a,this.b);
  }
}
