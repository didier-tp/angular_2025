import { Component, OnInit } from '@angular/core';
import { DeviseService } from '../common/service/devise.service'
import { Devise } from '../common/data/devise'
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter, firstValueFrom, map, Observable, switchMap, take, toArray } from 'rxjs';
@Component({
  selector: 'app-conversion',
  imports: [FormsModule, NgFor, AsyncPipe],
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit {
  montant: number = 0;
  codeDeviseSource: string = "?";
  codeDeviseCible: string = "?";
  montantConverti: number = 0;
  listeDevises: Devise[] = []; //à choisir dans liste déroulante.

  constructor(private _deviseService: DeviseService) { }

  montantConvertiObservable!: Observable<number>;

  onConvertir() {
    //this.montantConverti=0;
    this.montantConvertiObservable =
      this._deviseService.convertir$(this.montant,
        this.codeDeviseSource,
        this.codeDeviseCible);
  }


  async onConvertirV2() {
    try {
      console.log("debut de onConvertir")
      this.montantConverti = 0;
      this.montantConverti = await firstValueFrom(this._deviseService.convertir$(this.montant,
        this.codeDeviseSource, this.codeDeviseCible));
      console.log("resultat obtenu en différé")
    } catch (err) {
      console.log(err);
    }
    console.log("fin de onConvertir");
  }

  onConvertirV1() {
    console.log("debut de onConvertir")
    this.montantConverti = 0;
    this._deviseService.convertir$(this.montant,
      this.codeDeviseSource,
      this.codeDeviseCible)
      .pipe(take(1))//pour garantir un unsubscribe() différé
      .subscribe({
        next: (res: number) => {
          this.montantConverti = res;
          console.log("resultat obtenu en différé")
        },
        error: (err) => { console.log("error:" + err) }
      });
    console.log("suite immédiate (sans attente) de onConvertir");
    //Attention : sur cette ligne , le résultat n'est à ce stade pas encore connu
    //car appel asynchrone non bloquant et réponse ultérieure via callback
  }

  initListeDevises(tabDevises: Devise[]) {
    this.listeDevises = tabDevises;
    if (tabDevises && tabDevises.length > 0) {
      this.codeDeviseSource = tabDevises[0].code; //valeur par défaut
      this.codeDeviseCible = tabDevises[0].code; //valeur par défaut
    }
  }

  //ngOnInit() est automatiquement appelée par le framework après le constructeur
  //et après la prise en compte des injections et des éventuels @Input
  ngOnInit(): void {
    this._deviseService.getAllDevises$()
      .pipe(
        switchMap(devIntab => devIntab),
        filter((d) => d.change <= 80),
        toArray(),
        //map(tabDev=>tabDev.sort((d1,d2)=>d1.change-d2.change))
        map(tabDev => tabDev.sort((d1, d2) => d1 ? d1.code.localeCompare(d2.code) : 0))
      )
      .subscribe({
        next: (tabDev: Devise[]) => { this.initListeDevises(tabDev); },
        error: (err) => { console.log("error:" + err) }
      });
  }

  message = "";
  codeToUpdate = "?";
  changeToUpdate = 1;
  async onUpdate() {
    try {
      let d: Devise;
      let deviseTemp: Devise | undefined;
      for (d of this.listeDevises) {
        if (d.code == this.codeToUpdate) {
          deviseTemp = JSON.parse(JSON.stringify(d));
        }
      }
      if (deviseTemp == null)
        this.message = "pas de devise pour ce code";
      else {
        deviseTemp.change = this.changeToUpdate;
        await firstValueFrom(this._deviseService.putDevise$(deviseTemp));
        this.message = "mise à jour ok";
      }
    } catch (err) {
      console.log(err);
      this.message = <string>JSON.stringify(err);
    }
  }

}
