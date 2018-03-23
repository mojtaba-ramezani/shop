import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector   : 'app-nav-vertical-group',
    templateUrl: './nav-vertical-group.component.html',
    styleUrls  : ['./nav-vertical-group.component.scss']
})
export class AppNavVerticalGroupComponent implements OnInit
{
    @HostBinding('class') classes = 'nav-group nav-item';
    @Input() item: any;

    constructor()
    {
    }

    ngOnInit(): void {
                        
    }

}
