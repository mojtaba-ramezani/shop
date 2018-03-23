import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../modules/shared.module';
import { CategoriesIndexComponent } from './index/index.component';
import { CategoryCreateComponent } from './create/create.component';
import { CategoryShowComponent } from './show/show.component';

import {routing} from './categories.routing';


@NgModule({
    declarations: [
        CategoriesIndexComponent,
        CategoryCreateComponent,
        CategoryShowComponent,
    ],
    imports     : [
        SharedModule,
        routing
    ],
    providers   : [
        
    ],
})
export class CategoriesModule {
}
