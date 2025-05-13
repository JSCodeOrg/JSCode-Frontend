import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './Modules/Auth/recover-password/password-recover/recover-password.component';
import { AuthComponent } from '../app/Modules/Auth/auth-component/auth.component';
import { AdminRoleComponent } from './Modules/admin/selector-rol/selector-rol.component';
import { NewPasswordComponent } from './Modules/Auth/recover-password/new-password/new-password.component';
import { ValidateCodeComponent } from './Modules/Auth/recover-password/password-code/password-code.component';
import { HomeComponent } from './Modules/home/home.component';
import { VerifyComponent } from './Modules/Auth/register/verify/verify.component';
import { ChangeDefaultInfoComponent } from './Modules/Auth/change-default-info/change-default-info.component';
import { HomeSearchComponent } from './Modules/home-search/homesearch.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },  
    { path: 'login', component: AuthComponent}, 


    //Validar y Cambiar Contraseña
    { path: 'forgot-password', component: RecoverPasswordComponent },
    {path: 'new-password', component: NewPasswordComponent},
    {path: 'set-password', component: ValidateCodeComponent},


    //Auth
    { path: 'auth', component: AuthComponent },
    { path: 'admin', component: AdminRoleComponent },
    {path: 'changedefaultinfo', component: ChangeDefaultInfoComponent},

    //verificación de cuenta
    {path: 'verify', component: VerifyComponent},

    //busqueda y filtrado
    {path: 'busqueda', component: HomeSearchComponent}


];
