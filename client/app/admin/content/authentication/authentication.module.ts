import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { AppRegisterComponent } from './register/register.component';
import { AppLoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import {routing} from './authentication.routing';


@NgModule({
    declarations: [
        AppRegisterComponent,
        AppLoginComponent,
        LogoutComponent,
    ],
    imports     : [
        SharedModule,
        routing,
    ],
})

export class AuthenticationModule {

}
