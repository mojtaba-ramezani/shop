import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-logout',
  template: '',
  styles: [''],
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  public ngOnInit(): void {
    this.auth.logout();
   // this.redirectToLogin();
  }
//   redirectToLogin() {
//     this.router.navigate(['authentication/login']);
//  }

}
