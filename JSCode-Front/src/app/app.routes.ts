import { Routes } from '@angular/router';
import { HomeComponent } from './Modules/Auth/home/home.component';
import { AuthComponent } from './Modules/Auth/auth.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },  
    { path: 'login', component: AuthComponent}, 
];
