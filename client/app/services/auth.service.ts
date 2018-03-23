import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public jwtHelper: JwtHelper = new JwtHelper();
  public currentUser: any = { _id: '', username: '', role: '' };

  constructor(private userService: UserService,
      private router: Router) {
      const token = localStorage.getItem('token');
      if (token) {
          const decodedUser = this.decodeUserFromToken(token);
          this.setCurrentUser(decodedUser);
      }
  }

  public login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      },
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', username: '', role: '' };
    this.redirectToLogin();
  }
  private redirectToLogin() {
    this.router.navigate(['authentication/login']);
 }

  private decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  private setCurrentUser(decodedUser): void {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

}
