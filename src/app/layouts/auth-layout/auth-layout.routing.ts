import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from 'src/app/pages/privacy-policy/privacy-policy.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '**',
        redirectTo: 'login'
    }
];
