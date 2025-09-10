import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaAvecSignalComponent } from './tva-avec-signal.component';

describe('TvaAvecSignalComponent', () => {
  let component: TvaAvecSignalComponent;
  let fixture: ComponentFixture<TvaAvecSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvaAvecSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaAvecSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
