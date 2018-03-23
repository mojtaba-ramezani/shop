import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class AppConfigService {
    public settings: any;
    public defaultSettings: any;
    public onSettingsChanged: BehaviorSubject<any>;

    constructor(
        private router: Router,
        public platform: Platform,
    ) {
        this.defaultSettings = {
            layout          : {
                navigation: 'left',
                toolbar   : 'below',
                footer    : 'below',
                mode      : 'fullwidth',
            },
            colorClasses    : {
                toolbar: 'mat-white-500-bg',
                navbar : 'mat-app-dark-700-bg',
                footer : 'mat-app-dark-900-bg',
            },
            customScrollbars: true,
            routerAnimation : 'fadeIn',
        };

        if ( this.platform.ANDROID || this.platform.IOS ) {
            this.defaultSettings.customScrollbars = false;
        }

        this.settings = Object.assign({}, this.defaultSettings);

        router.events.subscribe((event) => {
                if ( event instanceof NavigationStart ) {
                    this.setSettings({layout: this.defaultSettings.layout});
                }
            },
        );

        this.onSettingsChanged = new BehaviorSubject(this.settings);

    }

    public setSettings(settings) {
        this.settings = Object.assign({}, this.settings, settings);
        this.onSettingsChanged.next(this.settings);
    }
}
