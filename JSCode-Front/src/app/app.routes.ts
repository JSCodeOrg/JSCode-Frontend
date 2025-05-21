import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './Modules/Auth/recover-password/password-recover/recover-password.component'; 
import { AuthComponent } from './Modules/Auth/auth-component/auth.component'; 
import { AdminRoleComponent } from './Modules/admin/selector-rol/selector-rol.component'; 
import { NewPasswordComponent } from './Modules/Auth/recover-password/new-password/new-password.component'; 
import { ValidateCodeComponent } from './Modules/Auth/recover-password/password-code/password-code.component'; 
import { HomeComponent } from './Modules/home/home.component'; 
import { VerifyComponent } from './Modules/Auth/register/verify/verify.component'; 
import { ChangeDefaultInfoComponent } from './Modules/Auth/change-default-info/change-default-info.component'; 
import { ProfileEditComponent } from './Modules/Auth/profile-edit/profile-edit.component'; 
import { HomeSearchComponent } from './Modules/home-search/homesearch.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: AuthComponent },
    { path: 'busqueda', component: HomeSearchComponent},


    //Validar y Cambiar Contraseña
    { path: 'forgot-password', component: RecoverPasswordComponent },
    { path: 'new-password', component: NewPasswordComponent },
    { path: 'set-password', component: ValidateCodeComponent },


    //Auth
    { path: 'auth', component: AuthComponent },
    { path: 'create-user-role', component: AdminRoleComponent },
    {path: 'changedefaultinfo', component: ChangeDefaultInfoComponent},

    //verificación de cuenta
    { path: 'verify', component: VerifyComponent },

    //Información del perfil
    { path: 'edit-profile', component: ProfileEditComponent }


];
