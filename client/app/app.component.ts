import { Component } from '@angular/core';
import { AppSplashScreenService } from './services/splash-screen.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.view.html',
    styleUrls  : ['./app.style.scss'],
})
export class AppComponent {
    constructor(private appSplashScreen: AppSplashScreenService) {
    }
}
