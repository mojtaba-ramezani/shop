import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../services/config.service';
import { appAnimations } from '../../../../material-design/material-helper/animations';
import { AuthService } from '../../../../services/auth.service';
import {EmailValidator} from '../../../../validators/email.validator';

@Component({
    selector   : 'app-login',
    templateUrl: './login.view.html',
    styleUrls  : ['./login.style.scss'],
    animations : appAnimations,
})
export class AppLoginComponent implements OnInit {
    public loginForm: FormGroup;
    private loginFormErrors: any;

    constructor(
        private appConfig: AppConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
    ) {
        this.appConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none',
            },
        });

        this.loginFormErrors = {
            email   : {},
            password: {},
        };
    }

    public ngOnInit(): void {

        if (this.auth.loggedIn) {
            this.redirectToProfile();
        }

        this.loginForm = this.formBuilder.group({
            email   : ['', Validators.compose([Validators.required, EmailValidator.validate])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }
    public redirectToProfile() {
        this.router.navigate(['admin/profile']);
    }
    public login() {
        this.auth.login(this.loginForm.value).subscribe(
        res => this.router.navigate(['admin/profile']),
        error => console.log('ایمیل یا پسورد نادرست!'),
        );
    }

    public onLoginFormValuesChanged() {
        for ( const field in this.loginFormErrors ) {
            if ( !this.loginFormErrors.hasOwnProperty(field) ) {
                continue;
            }

            this.loginFormErrors[field] = {};

            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid ) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
