import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConfigService } from '../../../../services/config.service';
import { appAnimations } from '../../../../material-design/material-helper/animations';
import { UserService } from '../../../../services/user.service';
import { EmailValidator } from '../../../../validators/email.validator';
import { EqualPasswordsValidator } from '../../../../validators/equalPasswords.validator';


@Component({
    selector: 'app-register',
    templateUrl: './register.view.html',
    styleUrls: ['./register.style.scss'],
    animations: appAnimations,
})
export class AppRegisterComponent implements OnInit {
    public registerForm: FormGroup;
    private registerFormErrors: any;

    constructor(
        private appConfig: AppConfigService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.appConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none',
            },
        });

        this.registerFormErrors = {
            username: {},
            email: {},
            password: {},
            passwordConfirm: {},
        };
    }

    public ngOnInit(): void {   
        
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            email: ['', Validators.compose([Validators.required, EmailValidator.validate])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            // passwordConfirm: ['', Validators.compose([Validators.required, EqualPasswordsValidator.validate('password', 'passwordConfirm')])],
            role: [''],
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    public onRegisterFormValuesChanged() {
        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            this.registerFormErrors[field] = {};

            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

    public register() {
        this.userService.register(this.registerForm.value).subscribe(
            res => {
                console.log('ok!!');
                this.redirectToLogin();
            },
            error => console.log('no ok!!'),
        );
    }
    public redirectToLogin() {
        this.router.navigate(['authentication/login']);
     }

}
