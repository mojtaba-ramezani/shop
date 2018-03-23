import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector     : 'app-quick-panel',
    templateUrl  : './quick-panel.view.html',
    styleUrls    : ['./quick-panel.style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppQuickPanelComponent implements OnInit {
    public date: Date;
    public settings: any;

    constructor(private http: HttpClient) {
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true,
        };

    }

    public ngOnInit(): void {

    }

}
