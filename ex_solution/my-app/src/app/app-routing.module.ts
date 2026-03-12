import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DemoComponent } from './demo/demo.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { authGardGuard } from './common/guard/auth-gard.guard';
import { LoginComponent } from './login/login.component';
import { OAuth2LogInOutComponent } from './oauth2-log-in-out/oauth2-log-in-out.component';
import { DeviseComponent } from './devise/devise.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  { path: "ngr-welcome" , component : WelcomeComponent},
  { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
  { path: "ngr-basic" , component : BasicComponent ,
      children : [
        { path: "tva" , component : TvaComponent},
        { path: "calculatrice/:mode" , component : CalculatriceComponent},
        { path: '', redirectTo: 'tva', pathMatch: 'prefix'}
      ]
  },
  { path: "ngr-login" , component : LoginComponent},
  { path: "ngr-oauth2-login-out" , component : OAuth2LogInOutComponent},
  { path: "ngr-devise" , component : DeviseComponent},
  { path: "ngr-conversion" , component : ConversionComponent , canActivate:[authGardGuard]},
  { path: "ngr-reservation" , component : ReservationComponent},
  { path: "ngr-demo" , component : DemoComponent},
  { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full'},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
