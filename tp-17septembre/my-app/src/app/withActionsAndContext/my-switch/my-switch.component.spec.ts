import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySwitchComponent } from './my-switch.component';

describe('MySwitchComponent', () => {
  let component: MySwitchComponent;
  let fixture: ComponentFixture<MySwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
