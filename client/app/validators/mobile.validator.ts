import {AbstractControl} from '@angular/forms';

export class MobileValidator {
  public static validate(c: AbstractControl) {
    let MOBILE_REGEXP = /^[1-9][0-9]{9}$/;
    return MOBILE_REGEXP.test(c.value) ? null : {
      validateMobile: {
        valid: false,
      },
    };
  }
}
