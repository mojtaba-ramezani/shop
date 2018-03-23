import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'app-navbar-horizontal',
    templateUrl  : './navbar-horizontal.view.html',
    styleUrls    : ['./navbar-horizontal.style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppNavbarHorizontalComponent implements OnInit {
    constructor() {
    }

    public ngOnInit(): void {

    }
}
