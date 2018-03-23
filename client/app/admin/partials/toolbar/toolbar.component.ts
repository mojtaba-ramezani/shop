import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AppConfigService } from '../../../services/config.service';


import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';


@Component({
    selector   : 'app-toolbar',
    templateUrl: './toolbar.view.html',
    styleUrls  : ['./toolbar.style.scss'],
})

export class AppToolbarComponent implements OnInit {
    public user = <any>{};

    public showLoadingBar: boolean;
    public horizontalNav: boolean;

    constructor(
        private router: Router,
        private appConfig: AppConfigService,
        private auth: AuthService,
        private userService: UserService,
    ) {             
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart ) {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd ) {
                    this.showLoadingBar = false;
                }
            });

        this.appConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });
    }

    public ngOnInit(): void {
        this.getUser();
    }


    public getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
     );
    }

    public search(value) {
        console.log(value);
    }
}
