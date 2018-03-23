import { NgModule } from '@angular/core';
// import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileModule } from './profile/profile.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './subCategories/subCategories.module';
import { ProductsModule } from './products/products.module';
import { ErrorsModule } from './errors/errors.module';
import { AuthGuardAdmin } from '../../guards/auth-admin.guard';
import { AuthGuardLogin } from '../../guards/auth-login.guard';

import { UnsavedChangesGuard } from '../../guards/unsaved-changes.guard';


@NgModule({
  imports: [
        // AuthenticationModule,
        ProfileModule,
        ProductsModule,
        SubCategoriesModule,
        CategoriesModule,
        ErrorsModule,
    ],
    providers: [
        AuthGuardAdmin,
        AuthGuardLogin,
        UnsavedChangesGuard,
      ],
})
export class ContentModule {
}
