import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AppMatSidenavHelperService } from '../services/mat-sidenav-helper.service';
import { AppMatchMedia } from '../services/match-media.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[appMatSidenavHelper]',
})
export class AppMatSidenavHelperDirective implements OnInit, OnDestroy {
    public matchMediaSubscription: Subscription;

    @HostBinding('class.mat-is-locked-open') public isLockedOpen: boolean = true;
    @HostBinding('class.mat-stop-transition') public stopTransition: boolean = true;

    @Input('appMatSidenavHelper') public id: string;
    @Input('mat-is-locked-open') public matIsLockedOpenBreakpoint: string;

    constructor(
        private appMatSidenavService: AppMatSidenavHelperService,
        private appMatchMedia: AppMatchMedia,
        private observableMedia: ObservableMedia,
        private matSidenav: MatSidenav,
    ) {
    }

    public ngOnInit(): void {
        this.appMatSidenavService.setSidenav(this.id, this.matSidenav);

        if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) ) {
            setTimeout(() => {
                this.isLockedOpen = true;
                this.matSidenav.mode = 'side';
                this.matSidenav.open();
            });
            this.stopTransition = false;
        } else {
            setTimeout(() => {
                this.isLockedOpen = false;
                this.matSidenav.mode = 'over';
                this.matSidenav.close();
            });

            setTimeout(() => {
                this.stopTransition = false;
            }, 3000);
        }

        this.matchMediaSubscription = this.appMatchMedia.onMediaChange.subscribe(() => {
            if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) ) {
                setTimeout(() => {
                    this.isLockedOpen = true;
                    this.matSidenav.mode = 'side';
                    this.matSidenav.open();
                });
            } else {
                setTimeout(() => {
                    this.isLockedOpen = false;
                    this.matSidenav.mode = 'over';
                    this.matSidenav.close();
                });
            }
        });

    }

    public ngOnDestroy(): void {
        this.matchMediaSubscription.unsubscribe();
    }
}

@Directive({
    selector: '[appMatSidenavToggler]',
})
export class AppMatSidenavTogglerDirective {
    @Input('appMatSidenavToggler') public id: number;

    constructor(private appMatSidenavService: AppMatSidenavHelperService) {
    }

    @HostListener('click')
    public onClick() {
        this.appMatSidenavService.getSidenav(this.id).toggle();
    }
}
