import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SubCategoriesIndexComponent } from './index/index.component';
import { SubCategoryCreateComponent } from './create/create.component';
import { SubCategoryShowComponent } from './show/show.component';
import {UnsavedChangesGuard} from '../../../guards/unsaved-changes.guard';

const APP_ROUTES: Routes = [
    {
        path     : 'subCategories',
        component: SubCategoriesIndexComponent,
    },
    {
        path     : 'subCategories/create',
        component: SubCategoryCreateComponent,
    },
    {
        path     : 'subCategories/show/:id',
        component: SubCategoryShowComponent,
        canDeactivate: [UnsavedChangesGuard],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(APP_ROUTES);
