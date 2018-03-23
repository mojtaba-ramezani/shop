import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../modules/shared.module';
import { AppMainComponent } from './admin.component';
import { AppContentComponent } from './content/content.component';
import { AppFooterComponent } from './partials/footer/footer.component';
import { AppNavbarVerticalComponent } from './partials/navbar/vertical/navbar-vertical.component';
import { AppToolbarComponent } from './partials/toolbar/toolbar.component';
import { AppNavigationModule } from '../material-design/material-components/navigation/navigation.module';
import { AppNavbarVerticalToggleDirective } from '../directives/navbar-vertical-toggle.directive';
import { AppNavbarHorizontalComponent } from './partials/navbar/horizontal/navbar-horizontal.component';
import { AppQuickPanelComponent } from './partials/quick-panel/quick-panel.component';


@NgModule({
    declarations: [
        AppContentComponent,
        AppFooterComponent,
        AppMainComponent,
        AppNavbarVerticalComponent,
        AppNavbarHorizontalComponent,
        AppToolbarComponent,
        AppNavbarVerticalToggleDirective,
        AppQuickPanelComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule,
        AppNavigationModule,
    ],
    exports     : [
        AppMainComponent,
    ],
})

export class AppMainModule {

}
