import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './Modules/Auth/recover-password/password-recover/recover-password.component';
import { AuthComponent } from './../app/Modules/Auth/authcomponent/auth.component';
import { AdminRoleComponent } from './Modules/Admin/SelectorRol/selector-rol.component';
import { NewPasswordComponent } from './Modules/Auth/recover-password/new_password/new-password.component';
import { ValidateCodeComponent } from './Modules/Auth/recover-password/password_code/password-code.component';

export const routes: Routes = [

    //Validar y Cambiar Contraseña
    { path: 'forgot-password', component: RecoverPasswordComponent },
    {path: 'new-password', component: NewPasswordComponent},
    {path: 'set-password', component: ValidateCodeComponent},


    //Auth
    { path: 'auth', component: AuthComponent },
    { path: 'admin', component: AdminRoleComponent },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },


];
