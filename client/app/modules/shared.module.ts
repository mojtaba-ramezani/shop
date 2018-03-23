import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule } from 'angular2-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from './material.module';
import { AppPipesModule } from '../pipes/pipes.module';
import { AppMatSidenavHelperDirective,
AppMatSidenavTogglerDirective } from '../directives/mat-sidenav-helper.directive';
import { AppPerfectScrollbarDirective } from '../directives/app-perfect-scrollbar.directive';
import { AppIfOnDomDirective } from '../directives/app-if-on-dom.directive';
import { AppMatchMedia } from '../services/match-media.service';
import { AppNavbarVerticalService } from '../services/navbar-vertical.service';
import { AppMatSidenavHelperService } from '../services/mat-sidenav-helper.service';



@NgModule({
    declarations   : [
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppIfOnDomDirective,
        AppPerfectScrollbarDirective,
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        AppPipesModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        MarkdownModule,
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppPipesModule,
        AppPerfectScrollbarDirective,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        AppIfOnDomDirective,
        MarkdownModule,
    ],
    entryComponents: [

    ],
    providers      : [
        CookieService,
        AppMatchMedia,
        AppNavbarVerticalService,
        AppMatSidenavHelperService,
    ],
})

export class SharedModule {

}
