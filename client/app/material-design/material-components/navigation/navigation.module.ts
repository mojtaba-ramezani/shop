import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { AppNavigationComponent } from './navigation.component';
import { AppNavVerticalItemComponent } from './vertical/nav-item/nav-vertical-item.component';
import { AppNavVerticalCollapseComponent } from './vertical/nav-collapse/nav-vertical-collapse.component';
import { AppNavVerticalGroupComponent } from './vertical/nav-group/nav-vertical-group.component';
import { AppNavHorizontalItemComponent } from './horizontal/nav-item/nav-horizontal-item.component';
import { AppNavHorizontalCollapseComponent } from './horizontal/nav-collapse/nav-horizontal-collapse.component';

@NgModule({
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        AppNavigationComponent
    ],
    declarations: [
        AppNavigationComponent,
        AppNavVerticalGroupComponent,
        AppNavVerticalItemComponent,
        AppNavVerticalCollapseComponent,
        AppNavHorizontalItemComponent,
        AppNavHorizontalCollapseComponent
    ]
})
export class AppNavigationModule
{
}
