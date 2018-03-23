import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { AppProfileComponent } from './profile.component';
import { AppProfileInformationComponent } from './tabs/information/information.component';
import { AppProfileAboutComponent } from './tabs/about/about.component';
import {routing} from './profile.routing';

@NgModule({
    declarations: [
        AppProfileComponent,
        AppProfileInformationComponent,
        AppProfileAboutComponent,
    ],
    imports     : [
        SharedModule,
        routing
    ],
    providers   : [

    ],
})
export class ProfileModule {
}
