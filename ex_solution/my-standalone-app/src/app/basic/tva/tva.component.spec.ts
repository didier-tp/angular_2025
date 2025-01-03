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

  
  it('tva(200,20) == 40', () => {
    component.ht=200;
    component.taux=20;
    component.onCalculerTvaTtc();
    fixture.detectChanges();
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanTva = compNativeElt.querySelector('#spanTva');
    console.log("from model, res:" + spanTva.innerText);
    expect(spanTva.innerText).toContain('40');
    });

    it('tva(200,10)=20 from ihm', () => {
      const compNativeElt = fixture.debugElement.nativeElement;
      let htInputElt = compNativeElt.querySelector("input[name='ht']");
      htInputElt.value=200;
      htInputElt.dispatchEvent(new Event('input'));
      
      let tauxSelectElt = compNativeElt.querySelector("select[name='taux']");
      let optionElt = null;
      for(let opt of tauxSelectElt.children){
        if(opt.innerText=="10%"){
          optionElt=opt;
        }
      }
      console.log("from ihm, optionElt.innerText:" + optionElt.innerText);
      tauxSelectElt.value=optionElt.value;
      fixture.detectChanges();

     
      console.log("from ihm, tauxSelectElt.value:" + tauxSelectElt.value);
      tauxSelectElt.dispatchEvent(new Event('change'));

      fixture.detectChanges();
   
      let spanTva = compNativeElt.querySelector('#spanTva');
      console.log("from ihm, tva:" + spanTva.innerText);
      expect(Number(spanTva.innerText)).toBe(20);
     
     
      });

});
