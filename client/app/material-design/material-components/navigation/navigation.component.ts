import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AppNavigationService } from './navigation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector     : 'app-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppNavigationComponent implements OnDestroy
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input('layout') layout = 'vertical';

    constructor(private appNavigationService: AppNavigationService)
    {
        this.navigationModelChangeSubscription =
            this.appNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
    }

    ngOnDestroy(): void {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}
