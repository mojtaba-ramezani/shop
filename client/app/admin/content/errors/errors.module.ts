import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { AppError404Component } from './404/error-404.component';

import {routing} from './errors.routing';


@NgModule({
    declarations: [
        AppError404Component,
    ],
    imports     : [
        SharedModule,
        routing,
    ],
})

export class ErrorsModule {

}
