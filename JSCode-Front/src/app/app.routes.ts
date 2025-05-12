import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './modules/auth/recover-password/password-recover/recover-password.component';
import { AuthComponent } from '../app/modules/auth/auth-component/auth.component';
import { AdminRoleComponent } from './modules/admin/selector-rol/selector-rol.component';
import { NewPasswordComponent } from './modules/auth/recover-password/new-password/new-password.component';
import { ValidateCodeComponent } from './modules/auth/recover-password/password-code/password-code.component';
import { HomeComponent } from './modules/home/home.component';
import { VerifyComponent } from './modules/auth/register/verify/verify.component';
import { ChangeDefaultInfoComponent } from './modules/auth/change-default-info/change-default-info.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },  
    { path: 'login', component: AuthComponent}, 


    //Validar y Cambiar Contraseña
    { path: 'forgot-password', component: RecoverPasswordComponent },
    {path: 'new-password', component: NewPasswordComponent},
    {path: 'set-password', component: ValidateCodeComponent},


    //Auth
    { path: 'auth', component: AuthComponent },
    { path: 'create-user-role', component: AdminRoleComponent },
    {path: 'changedefaultinfo', component: ChangeDefaultInfoComponent},

    //verificación de cuenta
    {path: 'verify', component: VerifyComponent}


];
