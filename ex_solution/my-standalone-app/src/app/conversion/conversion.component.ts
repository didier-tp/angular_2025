import { Component, inject } from '@angular/core';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.scss'
})
export class ConversionComponent {
  montant: number = 0;
  codeDeviseSource: string = "?";
  codeDeviseCible: string = "?";
  montantConverti: number = 0;

  listeDevises : Devise[] = []; //à choisir dans liste déroulante.

 //constructor(private _deviseService : DeviseService) { }
 private _deviseService =inject(DeviseService);

  onConvertir(){
        console.log("debut de onConvertir")
        this._deviseService.convertir$(this.montant,
                                      this.codeDeviseSource,
                                      this.codeDeviseCible)
                .subscribe({
                    next : (res :number) => { this.montantConverti = res;
                                      console.log("resultat obtenu en différé")} ,
                    error : (err) => { console.log("error:"+err)}
                   });
        console.log("suite immédiate (sans attente) de onConvertir");
        //Attention : sur cette ligne , le résultat n'est à ce stade pas encore connu
        //car appel asynchrone non bloquant et réponse ultérieure via callback
  }


  initListeDevises(tabDevises : Devise[]){
    this.listeDevises = tabDevises;
    if(tabDevises && tabDevises.length > 0){
      this.codeDeviseSource = tabDevises[0].code; //valeur par défaut
      this.codeDeviseCible = tabDevises[0].code; //valeur par défaut
    }
  }

  //ngOnInit() est automatiquement appelée par le framework après le constructeur
  //et après la prise en compte des injections et des éventuels @Input
  ngOnInit(): void {
    this._deviseService.getAllDevises$()
         .subscribe({
            next: (tabDev : Devise[])=>{ this.initListeDevises(tabDev); },
            error: (err) => { console.log("error:"+err)}
         });
  }

  message="" ;
codeToUpdate="?";
changeToUpdate=1;

async onUpdate() {
    try {
      let d:Devise;
      let deviseTemp : Devise|undefined;
        for(d of this.listeDevises){
          if(d.code==this.codeToUpdate){
            deviseTemp = JSON.parse(JSON.stringify(d));
          }
        }
        if(deviseTemp==null)
          this.message="pas de devise pour ce code";
        else{
          deviseTemp.change=this.changeToUpdate;
          await firstValueFrom(this._deviseService.putDevise$(deviseTemp));
          this.message="mise à jour ok";
        }
    } catch (err) {
      console.log(err);
      this.message = <string> JSON.stringify(err);
    }
  }


}
