import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';
import { ContentModule } from './admin/content/content.module';
import 'hammerjs';
import { AppMainModule } from './admin/admin.module';
import { SharedModule } from './modules/shared.module';
import { AppComponent } from './app.component';
import { AppSplashScreenService } from './services/splash-screen.service';
import { AppConfigService } from './services/config.service';
import { AppNavigationService } from './material-design/material-components/navigation/navigation.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { SubCategoryService } from './services/subCategory.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { AuthGuardLogin } from './guards/auth-login.guard';

const appRoutes: Routes = [
  {
    path        : 'admin',
    loadChildren: './admin/content/content.module#ContentModule',
    canActivate: [AuthGuardLogin],
  },
  {
    path        : 'authentication',
    loadChildren: './admin/content/authentication/authentication.module#AuthenticationModule',
  },  
  { path: '**', redirectTo: 'admin/notfound' },
  { path: '', redirectTo: 'admin/profile', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        MarkdownModule.forRoot(),
        AppMainModule,
    ],
    providers   : [
        AppSplashScreenService,
        AppConfigService,
        AuthService,
        UserService,
        ProductService,
        AppNavigationService,
        SubCategoryService,
        CategoryService,
        AuthGuardLogin,
    ],
    bootstrap   : [
        AppComponent,
    ],
})
export class AppModule {
}
