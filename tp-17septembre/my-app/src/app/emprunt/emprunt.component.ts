import { Component, signal , computed, effect} from '@angular/core';
import { FormsModule } from '@angular/forms';

export class Duree {
  label : string ="1mois"; //ex: "1an" , "6mois"
  constructor(
     public nbMois : number = 1, //value
     labelDuree : string | undefined= undefined
  ){
    if(labelDuree==undefined)
      this.label = nbMois+"mois"
    else 
      this.label = labelDuree
  }
}

@Component({
  selector: 'app-emprunt',
  imports: [FormsModule],
  templateUrl: './emprunt.component.html',
  styleUrl: './emprunt.component.scss'
})
export class EmpruntComponent {
      montant = signal(10000.0) //capital emprunté
      tauxInteretAnnuelPct = signal(2.0) //2% par an
      nbMois = signal(12*4) ; //4ans 
      message =signal(""); //message (pas fondamental) qui sera ici mis à jour via un effect

      
      //via computed() , mensualite est un signal qui sera automatiquement
      //mis à jour (recalculé) dès qu'un des signaux de base (vus comme des dépendances)
      // changera de valeur :                     
      mensualite=computed(
        ()=> this.calculMensualite(this.montant(),
                                  this.nbMois(),
                                  this.tauxInteretAnnuelPct())
        ); 
   
      //effect : moins préconisé que computed() mais pratique dans certains cas complexes
      ajustMessageEffect = effect( ()=>{
       if(this.nbMois()>=60){
          this.message.set("emprunt de longue duree. besoins complémentaires")
          //autres actions complémentaires (dans cas plus complexe/élaboré)
         }
        else 
          this.message.set("")
      });        

      calculMensualite(montant:number,nbMois:number,tauxInteretAnnuelPct:number){
         let mensualite=0;
         const tauxInteret = (tauxInteretAnnuelPct/12) / 100;
         if(tauxInteret!=0)
            mensualite = montant * tauxInteret / ( 1 - Math.pow(1+tauxInteret,- nbMois)) 
         else 
            mensualite = montant / nbMois
        return mensualite
      }

      //en V2 seulement (pour options du <select>)
      dureesSelectionnables = [ new Duree(1) , new Duree(3) ,new Duree(6) ,
                          new Duree(12,"1an") ,
                          new Duree(24,"2ans") ,
                          new Duree(36,"3ans") ,
                          new Duree(48,"4ans") ,
                          new Duree(60,"5ans") ,
                          new Duree(120,"10ans") ]
      
}
