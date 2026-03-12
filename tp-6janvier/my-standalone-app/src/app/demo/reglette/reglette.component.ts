import { Component, OnInit , EventEmitter, Output, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-reglette',
  templateUrl: './reglette.component.html',
  styleUrls: ['./reglette.component.scss']
})
export class RegletteComponent implements OnInit {

  width/*:string*/ = input("100"); //largeur paramétrage (100px par defaut)

  //@Output()
  //changeEvent  = new EventEmitter<{value:number}>();
  changeEvent = output<{value:number}>();

  onCurseur(event : Event){
       const evt : MouseEvent = <MouseEvent> event;
       const valX = evt.offsetX;
       const pctCurseur = (valX / Number(this.width())) * 100 ; //en %
       //console.log("pctCurseur="+pctCurseur);
       this.changeEvent.emit({value:pctCurseur});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
