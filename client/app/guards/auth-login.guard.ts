import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

import { Router } from '@angular/router';

@Injectable()
export class AuthGuardLogin implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  public canActivate() {
    if (this.auth.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }

}
