import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-calculatrice',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.scss'
})
export class CalculatriceComponent {
  a: number = 0;
  b: number = 0;
  res: number = 0;
  modeChoisi = "simple"; //ou "sophistiquee"

  listeRes: number[] = [];
  montrerHisto: boolean = true;

  constructor(route: ActivatedRoute) {
    //NB: { path: 'calculatrice/:mode', ... }
    route.params.subscribe(
      (params: Params) => {this.modeChoisi = params['mode']}
    );
  }

  onCalculer(op: string) {
    switch (op) {
      case "+":
        this.res = Number(this.a) + Number(this.b); break;
      case "-":
        this.res = this.a - this.b; break;
      case "*":
        this.res = this.a * this.b; break;
      default:
        this.res = 0;
    }
    this.listeRes.push(this.res);
  }

  //coordonnées relatives de la souris qui survole une div
  x: number = 0;
  y: number = 0;
  onMouseMove(evt: MouseEvent) {
    let currentDiv: HTMLElement = <HTMLElement>evt.target;
    this.x = evt.pageX - currentDiv.offsetLeft;
    this.y = evt.pageY - currentDiv.offsetTop;
  }
  onMouseLeave(evt: MouseEvent) {
    this.x = 0; this.y = 0;
  }
}
