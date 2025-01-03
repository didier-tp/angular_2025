import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaComponent } from './tva.component';
import { FormsModule } from '@angular/forms';
import { MynumberPipe } from '../../common/pipe/mynumber.pipe';
import { CalculService } from '../../common/service/calcul.service';

describe('TvaComponent', () => {
  let component: TvaComponent;
  let fixture: ComponentFixture<TvaComponent>;

  beforeEach(async () => {

    //stub for calculService
    let calculServiceStub = {
      calculTva(ht : number, tauxTvaPct : number ) : number{
         return ht * tauxTvaPct / 100;
        } ,

        addition(a:number,b:number){
          return Number(a)+Number(b);
        }

      };

    await TestBed.configureTestingModule({
      declarations: [TvaComponent , MynumberPipe],
      imports:[FormsModule],
      providers : [{provide : CalculService,
        useValue : calculServiceStub }]
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
    component.taux=20;
    component.onCalculerTvaTtc();//à ne pas oublier d'appeler si pas de dispatchEvent
    fixture.detectChanges();
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanTva = compNativeElt.querySelector('#spanTva');
    console.log("from model, tva:" + spanTva.innerText);
    expect(Number(spanTva.innerText)).toBe(40);
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

// a lancer via 
//ng test --include=**/tva.component.spec.ts   
