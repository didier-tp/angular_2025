import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { P2Component } from './p2/p2.component';
import { M2RoutingModule } from './m2-routing.module';



@NgModule({
  declarations: [ ReservationComponent, P2Component ],
  imports: [
    CommonModule , FormsModule, ReactiveFormsModule , M2RoutingModule
  ]
})
export class M2Module { }
