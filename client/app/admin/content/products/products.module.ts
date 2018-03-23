import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../modules/shared.module';
import { ProductsIndexComponent } from './index/index.component';
import { ProductCreateComponent } from './create/create.component';
import { ProductShowComponent } from './show/show.component';
import {UnsavedChangesGuard} from '../../../guards/unsaved-changes.guard';
import {routing} from './products.routing';

@NgModule({
    declarations: [
        ProductsIndexComponent,
        ProductCreateComponent,
        ProductShowComponent,
    ],
    imports     : [
        SharedModule,
        routing,
    ],
    providers   : [

    ],
})
export class ProductsModule {
}
