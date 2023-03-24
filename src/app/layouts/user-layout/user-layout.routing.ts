import { Routes } from '@angular/router';
import { UserHomeComponent } from 'src/app/pages/user-home/user-home.component';
import { UserLayoutComponent } from './user-layout.component';

export const UserLayoutRoutes: Routes = [
    { path: 'home', component: UserHomeComponent },
    {
        path: '**',
        redirectTo: 'home'
    }
];
