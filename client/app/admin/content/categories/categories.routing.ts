import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CategoriesIndexComponent } from './index/index.component';
import { CategoryCreateComponent } from './create/create.component';
import { CategoryShowComponent } from './show/show.component';
import {UnsavedChangesGuard} from '../../../guards/unsaved-changes.guard';

const APP_ROUTES: Routes = [
    {
        path     : 'categories',
        component: CategoriesIndexComponent,
    },
    {
        path     : 'categories/create',
        component: CategoryCreateComponent,
    },
    {
        path     : 'categories/show/:id',
        component: CategoryShowComponent,
        canDeactivate: [UnsavedChangesGuard],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
