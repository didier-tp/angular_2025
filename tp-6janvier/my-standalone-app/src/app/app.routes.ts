import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConversionComponent } from './conversion/conversion.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { authGuard } from './common/guard/auth.guard';
import { DemoComponent } from './demo/demo.component';
import { devisesResolver} from './common/resolver/devises.resolver'

export const routes: Routes = [
    { path: 'ngr-welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
    { path: 'ngr-conversion', component: ConversionComponent ,
         resolve : { devises : devisesResolver},
         canActivate : [authGuard]} ,
    { path: 'ngr-login', component: LoginComponent },
    { path: 'ngr-demo', component: DemoComponent },
    /*
    //Lazy loading of component is possible but useful/advised only for BIG/HEAVY components
    //because each lazy part is now a separate chunck as separate javascript file
    { path: 'ngr-login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: 'ngr-demo', loadComponent: () => import('./demo/demo.component').then(m => m.DemoComponent) },
    */
    { path: 'ngr-basic', component: BasicComponent ,
        children: [
            { path: 'tva', component: TvaComponent },
            { path: 'calculatrice/:mode', component: CalculatriceComponent },
            { path: '', redirectTo: 'tva', pathMatch: 'full'}
            ]
     },
    //LAZY LOADING of a whole subpart (before standaloneApp: childModule , standaloneApp : ANNEXE1 "hyper_component" with childrens)
    { path: 'ngr-annexe1', loadChildren: () => import('./p-annexe1/p-annexe1.routes').then(m => m.ANNEXE1_ROUTES) },
    { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full'},
];
