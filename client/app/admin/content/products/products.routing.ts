import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProductsIndexComponent } from './index/index.component';
import { ProductCreateComponent } from './create/create.component';
import { ProductShowComponent } from './show/show.component';
import {UnsavedChangesGuard} from '../../../guards/unsaved-changes.guard';

const APP_ROUTES: Routes = [
    {
        path     : 'products',
        component: ProductsIndexComponent,
    },
    {
        path     : 'products/create',
        component: ProductCreateComponent,
    },
    {
        path     : 'products/show/:id',
        component: ProductShowComponent,
        canDeactivate: [UnsavedChangesGuard],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
