import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { EssaiService } from '../common/service/essai.service';

@Component({
  selector: 'app-conversion',
  imports: [FormsModule, NgFor, AsyncPipe],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.scss'
})
export class ConversionComponent {
  montant: number = 0;
  codeDeviseSource: string = "?";
  codeDeviseCible: string = "?";
  montantConverti: number = 0;
  montantConvertiObs$!: Observable<number>;
  listeDevises: Devise[] = []; //à choisir dans liste déroulante.

  constructor(private route: ActivatedRoute,
    private _deviseService: DeviseService) {
    console.log("ConversionComponent")
    this.route.data.subscribe(
      (data: Data) =>{ 
        let tabDevises = data['devises'];
        if(tabDevises)
           this.initListeDevises(data['devises']); }
    );
  }

  async onConvertir2() {
    try {
      this.montantConverti = await firstValueFrom(
        this._deviseService.convertir$(this.montant,
          this.codeDeviseSource,
          this.codeDeviseCible));
    } catch (ex) {
      console.log(ex);
    }
  }

  onConvertir() {
    console.log("debut de onConvertir")

    this.montantConvertiObs$ = this._deviseService.convertir$(this.montant,
      this.codeDeviseSource,
      this.codeDeviseCible);
     // .pipe(shareReplay(1));  //hot observable partagé si plusieurs affichage via {{ montantConvertiObs$ | async }}
      
    /*
    this._deviseService.convertir$(this.montant,
      this.codeDeviseSource,
      this.codeDeviseCible)
      .subscribe({
        next: (res: number) => {
          this.montantConverti = res;
          console.log("resultat obtenu en différé")
        },
        error: (err) => { console.log("error:" + err) }
      });
      */
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

  private _essaiService = inject(EssaiService);//petit essai temporaire

  //ngOnInit() est automatiquement appelée par le framework après le constructeur
  //et après la prise en compte des injections et des éventuels @Input
  ngOnInit(): void {
    //besoin de chercher les devises que si pas de Resolver
    if(this.listeDevises.length==0)
      this._deviseService.getAllDevises$()
      .subscribe({
        next: (tabDev: Devise[]) => { this.initListeDevises(tabDev); },
        error: (err) => { console.log("error:" + err) }
      });

      this._essaiService.getCapitalCityFromCountryCode$('de').subscribe(
        (capitale)=>console.log("capitale="+capitale));
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
