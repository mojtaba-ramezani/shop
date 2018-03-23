import { Component } from '@angular/core';
import { AppConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './error-404.view.html',
  styleUrls  : ['./error-404.style.scss'],
})
export class AppError404Component {

  constructor(private appConfig: AppConfigService) {
    this.appConfig.setSettings({
      layout: {
          navigation: 'none',
          toolbar   : 'none',
          footer    : 'none',
      },
    });
   }

}
