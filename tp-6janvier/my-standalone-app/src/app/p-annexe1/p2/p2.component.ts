import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalculService } from '../common/service/calcul.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p2',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './p2.component.html',
  styleUrl: './p2.component.scss'
})
export class P2Component {
  a=2;
  b=3;
  res=0;

  private _calculService = inject(CalculService);
  public onAdd(){
     this.res=this._calculService.add(this.a,this.b);
  }

}
