import { CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProductShowComponent} from '../admin/content/products/show/show.component';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<ProductShowComponent> {

  constructor() {}

  public canDeactivate(component: ProductShowComponent) {
    if (component.product != null) {
      return window.confirm('You have unsaved changes. Still want to leave?');
    } else {
      return true;
    }
  }
}
