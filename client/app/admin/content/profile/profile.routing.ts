import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppProfileComponent } from './profile.component';
import { AuthGuardLogin } from '../../../guards/auth-login.guard';

const APP_ROUTES: Routes = [
    {
        path     : 'profile',
        component: AppProfileComponent,
        canActivate: [AuthGuardLogin],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
