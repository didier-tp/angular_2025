import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise.service';
import { messageFromError, messageFromEx } from '../common/util/util';
import { firstValueFrom } from 'rxjs';
import { inject, PLATFORM_ID } from "@angular/core";
import {  isPlatformBrowser, isPlatformServer, NgFor  } from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devise',
  standalone:true,
  imports:[FormsModule,NgFor],
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.scss']
})
export class DeviseComponent implements OnInit {
  private readonly platform = inject(PLATFORM_ID);

  cloneDevise(d:Devise){
    return JSON.parse(JSON.stringify(d));
  }

  identifyDevise(index:unknown, item:Devise){
    return item.code; 
 }

  tabDevises : Devise[] = [];

  selectedDevise : Devise | undefined;

  //[(ngModel)]="deviseTemp.code" , ....
  deviseTemp : Devise = new Devise();

  message /*: string*/ ="";

  mode : "newOne" | "existingOne" = "newOne";

  onNew(){
    this.mode="newOne";
    this.selectedDevise=undefined;
    this.deviseTemp = new Devise();
  }

  /*
  onAdd(){
    this.deviseService.postDevise$(this.deviseTemp)
    .subscribe(
     { next: (savedDevise)=>{ this.message="devise ajoutée";
                   this.addClientSide(savedDevise); } ,
      error: (err)=>{ this.message = messageFromError(err,"echec post"); }
   });
  }
  */

  async onAdd(){
    try{
      const savedDevise = await firstValueFrom(this.deviseService.postDevise$(this.deviseTemp));
      this.message="devise ajoutée";
      this.addClientSide(savedDevise); 
    }catch(ex){
        this.message = messageFromEx(ex,"echec post"); 
    }
  }

  addClientSide(savedDevise:Devise){
    this.tabDevises.push(savedDevise);
    this.onNew();
  }

  /*
  onDelete(){
    if(this.selectedDevise){
         this.deviseService.deleteDeviseServerSide$(this.selectedDevise.code)
             .subscribe(
              { next: ()=>{ this.message="devise bien supprimée";
                            this.deleteClientSide(); } ,
               error: (err)=>{ this.message = messageFromError(err,"echec suppression"); }
            });
    }
  }
  */
  async onDelete(){
    if(!this.selectedDevise)return;
    try{
        await firstValueFrom(this.deviseService.deleteDevise$(this.selectedDevise.code));
        this.message="devise bien supprimée";
        this.deleteClientSide();
    }catch(ex){
      this.message = messageFromEx(ex,"echec suppression"); 
    }
  }

  deleteClientSide(){
    if(this.selectedDevise){
      let indexToDelete = -1;
      this.tabDevises.forEach((devise,index)=>{if(devise==this.selectedDevise) indexToDelete=index; });
      if(indexToDelete>=0){
        this.tabDevises.splice(indexToDelete,1);
      }
    }
    this.onNew();
  }

  /*
  onUpdate(){
    this.deviseService.putDevise$(this.deviseTemp)
    .subscribe(
     { next: (updatedDevise)=>{ this.message="devise bien mise à jour";
                   this.updateClientSide(updatedDevise); } ,
      error: (err)=>{ this.message = messageFromError(err,"echec update (put)");}
   });
  }
  */

  async onUpdateV1(){
    try{
      const updatedDevise = await firstValueFrom(
      this.deviseService.putDevise$(this.deviseTemp));
      this.message="devise bien mise à jour";
      this.updateClientSide(updatedDevise); 
    }catch(ex){
      this.message = messageFromEx(ex,"echec update (put)"); 
    }
  }

  onUpdate(){
      this.deviseService.putDevise$(this.deviseTemp)
          .subscribe({
            next : (updatedDevise) => {
                     this.message="devise bien mise à jour";
                     this.updateClientSide(updatedDevise); 
             } ,
            error : (err)=>{ this.message =messageFromError(err,"echec update (put)"); }
          })
  }

  updateClientSide(updatedDevise:Devise){
    //test imposé par typescript sur this.selectedDevise potentiellement undefined
     if(this.selectedDevise != undefined){
      //Rappel: this.selectedDevise est ici une référence
      //qui pointe directement sur le i eme objet du tableau this.tabDevises
      //(selon ligne sélectionnée)
           this.selectedDevise.code = updatedDevise.code;
           this.selectedDevise.name = updatedDevise.name;
           this.selectedDevise.change = updatedDevise.change;
     }
    }

  //fonction évenementielle à appeler lorsque l'on
  //va sélectionner une des lignes du tableau
  onSelectDevise(d : Devise ){
    //NB: d:Devise est passé par référence (comportement de java/javascript)
    //et donc ici d et this.selectedDevise référencent
    //directement un des objets du tableau this.tabDevises
      this.selectedDevise = d;
      this.mode="existingOne";
      //via un clonage explicite , this.deviseTemp est une copie
      //indépendante de this.selectedDevise (et pas une référence sur l'objet original)
      this.deviseTemp = this.cloneDevise(this.selectedDevise);
      this.message = "devise selectionnée = " + JSON.stringify(this.selectedDevise);
  }

  constructor(public deviseService : DeviseService) {
    //injection de dépendance via constructeur
    //V2 (avec backend , api-rest)
   }

   ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
       this.fetchDevises();
    }
  }

  async fetchDevises(){
    try{
      this.tabDevises = await firstValueFrom( 
        this.deviseService.getAllDevises$()
              .pipe(
                map( (tabDev) => tabDev.sort((d1,d2)=>d1.change - d2.change) )
              )
        );
    }catch(ex){
      this.message = messageFromEx(ex,"echec rechercherDevises (get)"); 
    }
  }

}
