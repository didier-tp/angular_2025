import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
//import {  HttpClientModule } from '@angular/common/http'; //OK angular17 , deprecated angular18 , 
//declare provideHttpClient() in providers: [ ] instead since angular 18

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BasicComponent } from './basic/basic.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DemoComponent } from './demo/demo.component';
import { RegletteComponent } from './demo/reglette/reglette.component';
import { SeuilComponent } from './demo/seuil/seuil.component';
import { ListProdComponent } from './demo/list-prod/list-prod.component';
import { ZzComponent } from './demo/zz/zz.component';
import { MynumberPipe } from './common/pipe/mynumber.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTabsModule} from '@angular/material/tabs';
import { TogglePanelComponent } from './common/component/toggle-panel/toggle-panel.component';
import { LoginComponent } from './login/login.component';
import { MyAuthInterceptor } from './common/interceptor/my-auth.interceptor';
import { OAuth2LogInOutComponent } from './oauth2-log-in-out/oauth2-log-in-out.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DeviseComponent } from './devise/devise.component';
import { BorderOverDirective } from './common/directive/border-over.directive';
import { ReservationComponent } from './reservation/reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BasicComponent,
    CalculatriceComponent,
    MynumberPipe,
    TvaComponent,
    WelcomeComponent,
    ConversionComponent,
    DemoComponent, 
    RegletteComponent,
    SeuilComponent,
    ListProdComponent,
    ZzComponent,
    TogglePanelComponent,
    LoginComponent,
    OAuth2LogInOutComponent,
    DeviseComponent,
    BorderOverDirective,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    OAuthModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyAuthInterceptor,
      multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
