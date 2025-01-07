import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { P2Component } from './p2/p2.component';

const routes: Routes = [
  { path: 'p2', component: P2Component },
  { path: '', redirectTo: 'p2', pathMatch: 'prefix'},
  { path: 'reservation', component: ReservationComponent },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class M2RoutingModule { }
