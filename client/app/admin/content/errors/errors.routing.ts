import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppError404Component } from './404/error-404.component';

const APP_ROUTES: Routes = [
    {
        path     : 'notfound',
        component: AppError404Component,
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
