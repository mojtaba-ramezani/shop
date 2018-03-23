import { Component, OnInit } from '@angular/core';
import { appAnimations } from '../../../../../material-design/material-helper/animations';

@Component({
    selector   : 'app-profile-about',
    templateUrl: './about.view.html',
    styleUrls  : ['./about.style.scss'],
    animations : appAnimations,
})

export class AppProfileAboutComponent implements OnInit {

    public ngOnInit(): void {

    }
}
