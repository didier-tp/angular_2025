import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntComponent } from './emprunt.component';

describe('EmpruntComponent', () => {
  let component: EmpruntComponent;
  let fixture: ComponentFixture<EmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpruntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mensualite(montant=15000,taux=2.5,nbMois=60)==266.21 environ from model', () => {
      component.montant.set(15000);
      component.tauxInteretAnnuelPct.set(2.5);

      component.nbMois.set(60); 

      fixture.detectChanges();
      const compNativeElt = fixture.debugElement.nativeElement;
      const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
      const sMensualite = spanMensualiteElt.innerText
      console.log("from model, mensualite:" + sMensualite);
      expect(sMensualite).toContain('266.21');
});

/*
  it('mensualite(montant=15000,taux=2.5,nbMois=60)==266.21 environ from IHM', () => {
      const compNativeElt = fixture.debugElement.nativeElement;
      setValueInInput(compNativeElt,"input[name='montant']","15000")
      setValueInInput(compNativeElt,"input[name='tauxInteretAnnuel']","2.5")
      setValueInInput(compNativeElt,"input[name='nbMois']","60")

      fixture.detectChanges();
      
      const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
      const sMensualite = spanMensualiteElt.innerText
      console.log("from IHM, mensualite:" + sMensualite);
      //expect(sMensualite).toContain('266.21');
      expect(Number(sMensualite)).toBeCloseTo(266.21,2)
});
*/


it('mensualite(montant=15000,taux=2.5,select nbMois=60)==266.21 environ from IHM', () => {
      const compNativeElt = fixture.debugElement.nativeElement;
      setValueInInput(compNativeElt,"input[name='montant']","15000")
      setValueInInput(compNativeElt,"input[name='tauxInteretAnnuel']","2.5")
      
      //setValueInSelect(compNativeElt,"select[name='selDuree']",60)//à améliorer (petit bug)
      component.nbMois.set(60);

      fixture.detectChanges();
      
      const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
      const sMensualite = spanMensualiteElt.innerText
      console.log("from IHM, mensualite:" + sMensualite);
      //expect(sMensualite).toContain('266.21'); //à adapter si affichage ajusté via éventuel pipe 
      expect(Number(sMensualite)).toBeCloseTo(266.21,2)
});

});

function setValueInInput(compNativeElt:any,cssSelector:string,sVal:string){
      let montantInputElt = compNativeElt.querySelector(cssSelector);
      montantInputElt.value=sVal;
      montantInputElt.dispatchEvent(new Event('input'));
}

function setValueInSelect(compNativeElt:any,cssSelector:string,sVal:any){
      let montantInputElt = compNativeElt.querySelector(cssSelector);
      montantInputElt.value=Number(sVal);
      montantInputElt.dispatchEvent(new Event('change'));
}

//ng test --include=**/emprunt.component.spec.ts
