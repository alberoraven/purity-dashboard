import { Routes } from '@angular/router';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { ServiceDetailsComponent } from 'src/app/pages/service-details/service-details.component';
import { UserHomeComponent } from 'src/app/pages/user-home/user-home.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

export const UserLayoutRoutes: Routes = [
    { path: 'home', component: UserHomeComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'service-details/:id', component: ServiceDetailsComponent },
    { path: 'logout', component: LogoutComponent },
    {
        path: '**',
        redirectTo: 'home'
    }
];
