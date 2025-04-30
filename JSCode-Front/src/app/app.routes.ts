import { Routes } from '@angular/router';
import { AuthComponent } from './Modules/Auth/auth.component';
import { AdminRoleComponent } from './Modules/Admin/SelectorRol/selector-rol.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'admin', component: AdminRoleComponent },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },


];
