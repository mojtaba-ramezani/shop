import { Directive, HostListener, Input } from '@angular/core';
import { AppNavbarVerticalService } from '../services/navbar-vertical.service';
import { AppNavbarVerticalComponent } from '../admin/partials/navbar/vertical/navbar-vertical.component';

@Directive({
    selector: '[appNavbarVertical]',
})
export class AppNavbarVerticalToggleDirective {
    @Input() public appNavbarVertical: string;
    public navbar: AppNavbarVerticalComponent;

    constructor(private navbarService: AppNavbarVerticalService) {
    }

    @HostListener('click')
    public onClick() {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.appNavbarVertical] ) {
            return;
        }

        this.navbar[this.appNavbarVertical]();
    }
}
