import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2bComponent } from './p2b.component';

describe('P2bComponent', () => {
  let component: P2bComponent;
  let fixture: ComponentFixture<P2bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P2bComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
