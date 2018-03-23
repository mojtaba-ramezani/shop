import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../modules/shared.module';
import { SubCategoriesIndexComponent } from './index/index.component';
import { SubCategoryCreateComponent } from './create/create.component';
import { SubCategoryShowComponent } from './show/show.component';
import {routing} from './subCategories.routing';

@NgModule({
  declarations: [
    SubCategoriesIndexComponent,
    SubCategoryCreateComponent,
    SubCategoryShowComponent,
  ],
  imports     : [
    SharedModule,
    routing
  ],
  providers   : [

  ],
})
export class SubCategoriesModule {
}
