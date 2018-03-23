import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { appAnimations } from '../../../material-design/material-helper/animations';

import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';


@Component({
    selector     : 'app-profile',
    templateUrl  : './profile.view.html',
    styleUrls    : ['./profile.style.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : appAnimations,
})
export class AppProfileComponent implements OnInit {
    public user = <any>{};

    constructor(private userService: UserService, private auth: AuthService) {

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
}
