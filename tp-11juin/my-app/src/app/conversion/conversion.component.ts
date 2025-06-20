import { Component } from '@angular/core';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversion',
  imports: [FormsModule,NgFor,AsyncPipe],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.scss'
})
export class ConversionComponent {
  montant: number = 0;
  codeDeviseSource: string = "?";
  codeDeviseCible: string = "?";
  montantConverti: number = 0;

  montantConvertiObservable! : Observable<number> 

  listeDevises: Devise[] = []; //à choisir dans liste déroulante.

  constructor(private _deviseService: DeviseService) { }

  onConvertir() {
    this.montantConvertiObservable = 
        this._deviseService.convertir$(this.montant,
                                       this.codeDeviseSource,
                                        this.codeDeviseCible)
    //à afficher coté .html via {{ montantConvertiObservable | async }}
    //ça nécessite imports:[....,AsyncPipe]
  }

  onConvertirV1() {
    console.log("debut de onConvertir")
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
      .subscribe({
        next: (tabDev: Devise[]) => { this.initListeDevises(tabDev); },
        error: (err) => { console.log("error:" + err) }
      });
  }
}
