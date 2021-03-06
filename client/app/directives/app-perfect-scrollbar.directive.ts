import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AppConfigService } from '../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from '@angular/cdk/platform';

@Directive({
    selector: '[appPerfectScrollbar]',
})
export class AppPerfectScrollbarDirective implements OnInit, AfterViewInit, OnDestroy {
    public onSettingsChanged: Subscription;
    public isDisableCustomScrollbars: boolean = false;
    public isMobile = false;
    public isInitialized = true;
    public ps;

    constructor(
        private element: ElementRef,
        private appConfig: AppConfigService,
        private platform: Platform,
    ) {
        this.onSettingsChanged =
            this.appConfig.onSettingsChanged
                .subscribe(
                    (settings) => {
                        this.isDisableCustomScrollbars = !settings.customScrollbars;
                    },
                );

        if ( this.platform.ANDROID || this.platform.IOS ) {
            this.isMobile = true;
        }
    }

    public ngOnInit(): void {

    }

    public ngAfterViewInit() {
        if ( this.isMobile || this.isDisableCustomScrollbars ) {
            this.isInitialized = false;
            return;
        }

        // Initialize the perfect-scrollbar
        this.ps = new PerfectScrollbar(this.element.nativeElement);
    }

    public ngOnDestroy(): void {
        if ( !this.isInitialized ) {
            return;
        }

        this.onSettingsChanged.unsubscribe();

        // Destroy the perfect-scrollbar
        this.ps.destroy();
    }

    public update() {
        if ( !this.isInitialized ) {
            return;
        }

        // Update the perfect-scrollbar
        this.ps.update();
    }

    public destroy(): void {
        this.ngOnDestroy();
    }

    public scrollToX(x: number, speed?: number) {
        this.animateScrolling('scrollLeft', x, speed);
    }

    public scrollToY(y: number, speed?: number) {
        this.animateScrolling('scrollTop', y, speed);
    }

    public scrollToTop(offset?: number, speed?: number) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    }

    public scrollToLeft(offset?: number, speed?: number) {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    }

    public scrollToRight(offset?: number, speed?: number) {
        const width = this.element.nativeElement.scrollWidth;

        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    }

    public scrollToBottom(offset?: number, speed?: number) {
        const height = this.element.nativeElement.scrollHeight;

        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    }

    public animateScrolling(target: string, value: number, speed?: number) {
        if ( !speed ) {
            this.element.nativeElement[target] = value;

            // PS has weird event sending order, this is a workaround for that
            this.update();
            this.update();
        } else if ( value !== this.element.nativeElement[target] ) {
            let newValue = 0;
            let scrollCount = 0;

            let oldTimestamp = performance.now();
            let oldValue = this.element.nativeElement[target];

            const cosParameter = (oldValue - value) / 2;

            const step = (newTimestamp) => {
                scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));

                newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));

                // Only continue animation if scroll position has not changed
                if ( this.element.nativeElement[target] === oldValue ) {
                    if ( scrollCount >= Math.PI ) {
                        this.element.nativeElement[target] = value;

                        // PS has weird event sending order, this is a workaround for that
                        this.update();

                        this.update();
                    } else {
                        this.element.nativeElement[target] = oldValue = newValue;

                        oldTimestamp = newTimestamp;

                        window.requestAnimationFrame(step);
                    }
                }
            };

            window.requestAnimationFrame(step);
        }
    }
}
