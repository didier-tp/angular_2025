import { Component, OnInit } from '@angular/core';
import { Devise } from '../common/data/devise';

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.scss']
})
export class DeviseComponent implements OnInit {

  cloneDevise(d:Devise){
    return JSON.parse(JSON.stringify(d));
  }

  tabDevises : Devise[] = [];

  selectedDevise : Devise | undefined;

  //[(ngModel)]="deviseTemp.code" , ....
  deviseTemp : Devise = new Devise();

  message /*: string*/ ="";

  mode : "newOne" | "existingOne" = "newOne";

  constructor() {
    //V1 (sans backend), avec des valeurs simulées en mémoire
    this.tabDevises.push(new Devise("EUR","Euro",1));
    this.tabDevises.push(new Devise("USD","Dollar",1.1));
    this.tabDevises.push(new Devise("GBP","Livre",0.9));
    this.tabDevises.push(new Devise("JPY","Yen",120));
   }

  ngOnInit(): void {
  }

  onSelectDevise(d : Devise){
     this.selectedDevise =d;
     this.deviseTemp = this.cloneDevise(d);

  }

  onUpdate(){
    if(this.selectedDevise==undefined) return;
    this.selectedDevise.change = this.deviseTemp.change;
    //....
  }

  //à coder en TP:
  //onNew() , onAdd() , onDelete() , onUpdate(), onSelectDevise(d : Devise )

}
