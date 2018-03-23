import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppRegisterComponent } from './register/register.component';
import { AppLoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const APP_ROUTES: Routes = [
    {
        path: 'register',
        component: AppRegisterComponent,
    },
    {
        path: 'login',
        component: AppLoginComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
