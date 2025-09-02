import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvaComponent } from './tva.component';
import { signal } from '@angular/core';

//NB: cet import additionnel est nécessaire pour fixer directement la valeur d'un signal
//qui est de type Signal<number> mais pas WritableSignal<number> depuis une classe de test:
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';


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

  //NB: cette fonction de test fixe direcment la valeur de certains signaux en mémoire 
  // ce qui n'est pas toujours utile si on le fait indirectement comme conséquence d'une saisie coté vue
  it('tva(200,20)=40 from model', () => {
    component.ht.set(200) // DOES NOT COMPILE IN test class if ht de type Signal<number> (not WritableSignal<number>)!!!!
    
    //signalSetFn(<any>component.ht[SIGNAL], 200);
    //signalSetFn(<any>component.nomDesignal[SIGNAL], nouvelleValeur); permet de chnger la valeur d'un signal
    //même s'il manque la partie "Writable" et ça fonctionne dans une classe de test .

    component.tauxTvaPct.set(20) // DOES NOT COMPILE IN test class !!!!
    //signalSetFn(<any>component.tauxTvaPct[SIGNAL], 20);

    
    fixture.detectChanges();
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanTvaElt = compNativeElt.querySelector('#spanTva');
    console.log("from model, tva:" + spanTvaElt.innerText);
    expect(Number(spanTvaElt.innerText)).toBeCloseTo(40, 2);
    // .toBeCloseTo(expectedValue,precision_as_nb_decimal)
  });
  

  it('tva(200,10)=20 from IHM', () => {
    //Saisies de valeurs (via native_elements and DOM api):
    const compNativeElt = fixture.debugElement.nativeElement;
    let htInputElt = compNativeElt.querySelector("input[name='ht']");
    htInputElt.value = 200;
    htInputElt.dispatchEvent(new Event('input'));
    /* // Pour version simplifiée avec button et sans liste déroulante:
    let tauxTvaPctInputElt = compNativeElt.querySelector("input[name='tauxTvaPct']");
    tauxTvaPctInputElt.value=20;
    tauxTvaPctInputElt.dispatchEvent(new Event('input'));
    let calculButtonElt =
    compNativeElt.querySelector("input[type='button'][value='calculer']");
    //calculButtonElt.dispatchEvent(new Event('click'));
    calculButtonElt.click(); */
    // Pour version sans button et avec liste déroulante:
    let tauxTvaPctSelectElt = compNativeElt.querySelector("select[name='tauxTvaPct']");
    let optionElt = null;
    for (let opt of tauxTvaPctSelectElt.children) {
      if (opt.innerText == "10%") {
        optionElt = opt;
      }
    }
    console.log("from ihm, optionElt.innerText:" + optionElt.innerText
      + " , optionElt.value:" + optionElt.value);
    tauxTvaPctSelectElt.value = optionElt.value;
    fixture.detectChanges();
    console.log("from ihm, tauxTvaPctSelectElt.value:" + tauxTvaPctSelectElt.value);
    tauxTvaPctSelectElt.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    //Vérifications des valeurs saisies et calculées dans le modèle:
    //NB: to read and check signal value, same syntax as in .html : as a function with ()
    expect(Number(component.ht())).toBe(200);
    expect(component.tauxTvaPct()).toBe(10);
    expect(component.ttc()).toBeCloseTo(220, 2);
    //Vérifications des valeurs calculées dans la vue (template html):
    let spanTvaElt = compNativeElt.querySelector('#spanTva');
    console.log("from IHM, res:" + spanTvaElt.innerText);
    expect(Number(spanTvaElt.innerText)).toBeCloseTo(20, 2);
  });

});

//ng test --include=**/tva.component.spec.ts