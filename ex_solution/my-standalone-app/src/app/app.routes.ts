import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DeviseComponent } from './devise/devise.component';
import { OAuth2LogInOutComponent } from './oauth2-log-in-out/oauth2-log-in-out.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authGuard } from './common/guard/auth.guard';

export const routes: Routes = [
    { path: "ngr-welcome" , component : WelcomeComponent},
    { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
    { path: "ngr-basic" , component : BasicComponent,
       children: [
             { path: 'tva', component: TvaComponent },
             { path: 'calculatrice/:mode', component: CalculatriceComponent },
             { path: '', redirectTo: 'tva', pathMatch: 'prefix'}
       ]
     },
    { path: "ngr-login" , component : LoginComponent },
    { path: "ngr-reservation" , component : ReservationComponent },
    { path: "ngr-conversion" , component : ConversionComponent },
    { path: "ngr-devise" , component : DeviseComponent , canActivate: [authGuard] },
    { path: "ngr-oauth2-login-out" , component : OAuth2LogInOutComponent},
    { path : "ngr-not-authorized" , component : NotAuthorizedComponent }
];
