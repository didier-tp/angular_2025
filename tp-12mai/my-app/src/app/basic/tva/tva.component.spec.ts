import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaComponent } from './tva.component';

describe('TvaComponent', () => {
  let component: TvaComponent;
  let fixture: ComponentFixture<TvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tva(200,20)=40 from model', () => {
    component.ht=200;
    component.tauxTvaPct=20; 
    component.onCalculerTvaTtc();//à ne pas oublier d'appeler si pas de dispatchEvent
    fixture.detectChanges();
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanTvaElt = compNativeElt.querySelector('#spanTva');
    console.log("from model, tva:"  + spanTvaElt.innerText);
    expect(Number(spanTvaElt.innerText)).toBeCloseTo(40,2);
    // .toBeCloseTo(expectedValue,precision_as_nb_decimal)
    });

    it('tva(200,10)=220  from IHM', () => {
      //Saisies de valeurs (via native_elements and DOM api):
      const compNativeElt = fixture.debugElement.nativeElement;
      let htInputElt = compNativeElt.querySelector("input[name='ht']");
      htInputElt.value=200;
      htInputElt.dispatchEvent(new Event('input'));

      /*
      // Pour version simplifiée avec button et sans liste déroulante:
      let tauxTvaPctInputElt = compNativeElt.querySelector("input[name='tauxTvaPct']");
      tauxTvaPctInputElt.value=20;
      tauxTvaPctInputElt.dispatchEvent(new Event('input'));

      let calculButtonElt = 
         compNativeElt.querySelector("input[type='button'][value='calculer']");
      //calculButtonElt.dispatchEvent(new Event('click'));
      calculButtonElt.click();
    */

       // Pour version sans button et avec liste déroulante:
      let tauxTvaPctSelectElt = compNativeElt.querySelector("select[name='tauxTvaPct']");
      let optionElt = null;
      for(let opt of tauxTvaPctSelectElt.children){
        //opt.value is a complex "index: value"
        //if(opt.value=="1: 10"){
        if(opt.innerText=="10%"){
          optionElt=opt;
        }
      }
      console.log("from ihm, optionElt.innerText:" + optionElt.innerText + " , optionElt.value:" + optionElt.value);
      tauxTvaPctSelectElt.value=optionElt.value;
      fixture.detectChanges();
      console.log("from ihm, tauxTvaPctSelectElt.value:" + tauxTvaPctSelectElt.value);
      tauxTvaPctSelectElt.dispatchEvent(new Event('change'));

      fixture.detectChanges();
      //Vérifications des valeurs saisies et calculées dans le modèle:
      expect(Number(component.ht)).toBe(200);
      expect(component.tauxTvaPct).toBe(10);
      expect(component.ttc).toBeCloseTo(220,2);

      //Vérifications des valeurs calculées dans la vue (template html):
      let spanTtcElt = compNativeElt.querySelector('#spanTtc');
      console.log("from IHM, res:"  + spanTtcElt.innerText); 
      expect(Number(spanTtcElt.innerText)).toBeCloseTo(220,2);
      });
});


//ng test --include=**/tva.component.spec.ts