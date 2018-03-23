import { Component, ElementRef, HostBinding, HostListener, Input,
  OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppMatchMedia } from '../../../../services/match-media.service';
import { AppNavbarVerticalService } from '../../../../services/navbar-vertical.service';
import { ObservableMedia } from '@angular/flex-layout';
import { AppMainComponent } from '../../../admin.component';
import { NavigationEnd, Router } from '@angular/router';
import { AppNavigationService } from '../../../../material-design/material-components/navigation/navigation.service';
import { AppPerfectScrollbarDirective } from '../../../../directives/app-perfect-scrollbar.directive';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Component({
    selector     : 'app-navbar-vertical',
    templateUrl  : './navbar-vertical.view.html',
    styleUrls    : ['./navbar-vertical.style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppNavbarVerticalComponent implements OnInit, OnDestroy {
    private _backdropElement: HTMLElement | null = null;
    @HostBinding('class.close') public isClosed: boolean;
    @HostBinding('class.folded') public isFoldedActive: boolean;
    @HostBinding('class.folded-open') public isFoldedOpen: boolean;
    @HostBinding('class.initialized') public initialized: boolean;
    @Input('folded') public foldedByDefault = false;
    @ViewChild(AppPerfectScrollbarDirective) public appPerfectScrollbarDirective;

    public matchMediaWatcher: Subscription;
    public navigationServiceWatcher: Subscription;
    public appPerfectScrollbarUpdateTimeout;
    public player: AnimationPlayer;

    constructor(
        private appMainComponent: AppMainComponent,
        private appMatchMedia: AppMatchMedia,
        private appNavigationService: AppNavigationService,
        private navBarService: AppNavbarVerticalService,
        public media: ObservableMedia,
        private router: Router,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private animationBuilder: AnimationBuilder,
    ) {
        navBarService.setNavBar(this);

        this.navigationServiceWatcher =
            this.appNavigationService.onNavCollapseToggle.subscribe(() => {
                this.appPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.appPerfectScrollbarDirective.update();
                }, 310);
            });

        this.matchMediaWatcher =
            this.appMatchMedia.onMediaChange
                .subscribe((mediaStep) => {
                    setTimeout(() => {

                        if ( this.media.isActive('lt-lg') ) {
                            this.closeBar();
                            this.deActivateFolded();
                        } else {
                            this.openBar();
                            this._detachBackdrop();
                        }
                    });
                });

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd ) {
                    if ( this.media.isActive('lt-lg') ) {
                        setTimeout(() => {
                            this.closeBar();
                        });
                    }
                }
            },
        );
    }

    public ngOnInit(): void {
        this.isClosed = false;
        this.isFoldedActive = this.foldedByDefault;
        this.isFoldedOpen = false;
        this.initialized = false;
        this.updateCssClasses();

        setTimeout(() => {
            this.initialized = true;
        });

        if ( this.media.isActive('lt-lg') ) {
            this.closeBar();
            this.deActivateFolded();
        } else {
            if ( !this.foldedByDefault ) {
                this.deActivateFolded();
            } else {
                this.activateFolded();
            }
        }
    }

    public ngOnDestroy(): void {
        clearTimeout(this.appPerfectScrollbarUpdateTimeout);
        this.matchMediaWatcher.unsubscribe();
        this.navigationServiceWatcher.unsubscribe();
    }

    public openBar() {
        this.isClosed = false;
        this.updateCssClasses();
        if ( this.media.isActive('lt-lg') ) {
            this._attachBackdrop();
        }
    }

    public closeBar() {
        this.isClosed = true;
        this.updateCssClasses();
        this._detachBackdrop();
    }

    public toggleBar() {
        if ( this.isClosed ) {
            this.openBar();
        } else {
            this.closeBar();
        }
    }

    public toggleFold() {
        if ( !this.isFoldedActive ) {
            this.activateFolded();
        } else {
            this.deActivateFolded();
        }
    }

    public activateFolded() {
        this.isFoldedActive = true;
        this.appMainComponent.addClass('app-nav-bar-folded');
        this.isFoldedOpen = false;
    }

    public deActivateFolded() {
        this.isFoldedActive = false;
        this.appMainComponent.removeClass('app-nav-bar-folded');
        this.isFoldedOpen = false;
    }

    @HostListener('mouseenter')
    public onMouseEnter() {
        this.isFoldedOpen = true;
    }

    @HostListener('mouseleave')
    public onMouseLeave() {
        this.isFoldedOpen = false;
    }

    public updateCssClasses() {
        if ( this.isClosed ) {
            this.appMainComponent.addClass('app-nav-bar-opened');
            this.appMainComponent.removeClass('app-nav-bar-closed');
        } else {
            this.appMainComponent.addClass('app-nav-bar-closed');
            this.appMainComponent.removeClass('app-nav-bar-opened');
        }
    }

    private _attachBackdrop() {
        this._backdropElement = this._renderer.createElement('div');
        this._backdropElement.classList.add('app-navbar-backdrop');

        this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdropElement);

        this.player =
            this.animationBuilder
                .build([
                    animate('400ms ease', style({opacity: 1})),
                ]).create(this._backdropElement);

        this.player.play();

        this._backdropElement.addEventListener('click', () => {
                this.closeBar();
            },
        );
    }

    private _detachBackdrop() {
        if ( this._backdropElement ) {
            this.player =
                this.animationBuilder
                    .build([
                        animate('400ms cubic-bezier(.25,.8,.25,1)', style({opacity: 0})),
                    ]).create(this._backdropElement);

            this.player.play();

            this.player.onDone(() => {
                if ( this._backdropElement ) {
                    this._backdropElement.parentNode.removeChild(this._backdropElement);
                    this._backdropElement = null;
                }
            });
        }
    }
}
