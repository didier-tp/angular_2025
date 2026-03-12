import { Routes } from "@angular/router";
import { P2Component } from "./p2/p2.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { Annexe1Component } from "./p-annexe1.component";
import { CalculService } from "./common/service/calcul.service";
import { P2bComponent } from "./p2b/p2b.component";

export const ANNEXE1_ROUTES: Routes = [
    {path: '',
    component: Annexe1Component,
    providers: [
         CalculService
    ],
    children: [
        { path: 'p2', component: P2Component },
        { path: 'p2b', component: P2bComponent  },
        { path: '', redirectTo: 'p2', pathMatch: 'full'},
        { path: 'reservation', component: ReservationComponent }
    ]}
];