import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit,
  Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppConfigService } from '../services/config.service';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Component({
    selector     : 'app-main',
    templateUrl  : './admin.view.html',
    styleUrls    : ['./admin.style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppMainComponent implements OnInit, OnDestroy {

    @Input() public onSettingsChanged: Subscription;
    @Input() public appSettings: any;
    @HostBinding('class.boxed') public boxed;

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private appConfig: AppConfigService,
        private platform: Platform,
        @Inject(DOCUMENT) private document: any,
    ) {
        this.onSettingsChanged =
            this.appConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.appSettings = newSettings;
                        this.boxed = this.appSettings.layout.mode === 'boxed';
                    },
                );

        if ( this.platform.ANDROID || this.platform.IOS ) {
            this.document.body.className += ' is-mobile';
        }
    }

    public ngOnInit(): void {     

    }   

    public ngOnDestroy(): void {
        this.onSettingsChanged.unsubscribe();
    }

    public addClass(className: string) {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    public removeClass(className: string) {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
