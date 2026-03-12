import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatriceComponent } from './calculatrice.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CalculatriceComponent', () => {
  let component: CalculatriceComponent;
  let fixture: ComponentFixture<CalculatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatriceComponent],
      providers: [ {
              provide: ActivatedRoute,
              useValue: {  params: of({mode: 'simple'})}
            }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('10-3=7 from IHM', () => {
const compNativeElt = fixture.debugElement.nativeElement;
let aInputElt = compNativeElt.querySelector("input[name='a']");
aInputElt.value=10;
aInputElt.dispatchEvent(new Event('input'));
let bInputElt = compNativeElt.querySelector("input[name='b']");
bInputElt.value=3;
bInputElt.dispatchEvent(new Event('input'));
let moinsButtonElt =
compNativeElt.querySelector("input[type='button'][value='-']");
//moinsButtonElt.dispatchEvent(new Event('click'));
moinsButtonElt.click();
fixture.detectChanges();
expect(component.a).toBe(10);
expect(component.b).toBe(3);
expect(component.res).toBe(7);
let spanResElt = compNativeElt.querySelector('#spanRes');
console.log("from IHM, res:" + spanResElt.innerText);
expect(spanResElt.innerText).toContain('7');
});

});


//ng test --include=**/calculatrice.component.spec.ts