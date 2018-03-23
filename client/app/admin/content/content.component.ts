import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { appAnimations } from '../../material-design/material-helper/animations';
import { AppConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
    selector   : 'app-content',
    templateUrl: './content.view.html',
    styleUrls  : ['./content.style.scss'],
    animations : appAnimations,
})
export class AppContentComponent implements OnInit, OnDestroy {
    public onSettingsChanged: Subscription;
    public appSettings: any;

    @HostBinding('@routerTransitionUp') public routeAnimationUp: boolean = false;
    @HostBinding('@routerTransitionDown') public routeAnimationDown: boolean = false;
    @HostBinding('@routerTransitionRight') public routeAnimationRight: boolean = false;
    @HostBinding('@routerTransitionLeft') public routeAnimationLeft: boolean = false;
    @HostBinding('@routerTransitionFade') public routeAnimationFade: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private appConfig: AppConfigService,
    ) {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe((event) => {
                switch ( this.appSettings.routerAnimation ) {
                    case 'fadeIn':
                        this.routeAnimationFade = !this.routeAnimationFade;
                        break;
                    case 'slideUp':
                        this.routeAnimationUp = !this.routeAnimationUp;
                        break;
                    case 'slideDown':
                        this.routeAnimationDown = !this.routeAnimationDown;
                        break;
                    case 'slideRight':
                        this.routeAnimationRight = !this.routeAnimationRight;
                        break;
                    case 'slideLeft':
                        this.routeAnimationLeft = !this.routeAnimationLeft;
                        break;
                }
            });

        this.onSettingsChanged =
            this.appConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.appSettings = newSettings;
                    },
                );
    }

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
        this.onSettingsChanged.unsubscribe();
    }
}
