import { Routes } from '@angular/router';
import { EmpruntComponent } from './emprunt/emprunt.component';
import { MySwitchComponent } from './withActionsAndContext/my-switch/my-switch.component';
import { TaskCrudComponent } from './task/task-crud/task-crud.component';

export const routes: Routes = [
    { path: 'emprunt', component: EmpruntComponent },
    { path: 'my-switch', component:  MySwitchComponent},
    { path: 'task-crud', component:  TaskCrudComponent},
    { path: '', redirectTo: '/emprunt', pathMatch: 'full'},
];
