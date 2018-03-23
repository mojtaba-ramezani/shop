import { Component, OnInit } from '@angular/core';
import { appAnimations } from '../../../../../material-design/material-helper/animations';

import { AuthService } from '../../../../../services/auth.service';
import { UserService } from '../../../../../services/user.service';

@Component({
    selector   : 'app-profile-information',
    templateUrl: './information.view.html',
    styleUrls  : ['./information.style.scss'],
    animations : appAnimations,
})
export class AppProfileInformationComponent implements OnInit {
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
