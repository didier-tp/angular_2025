import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: 'ngr-welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
    { path: 'ngr-login', component: LoginComponent },
    { path: 'ngr-basic', component: BasicComponent },
    { path: 'ngr-m2', loadChildren: () => import('../m2/m2.module').then(m => m.M2Module) },
    { path: '**', redirectTo: '/ngr-welcome', pathMatch: 'full'},
];
