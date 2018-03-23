import {AbstractControl} from '@angular/forms';

export class DigitValidator {
  public static validate(c: AbstractControl) {
    let DIGIT_REGEXP = /^\d+$/;
    return DIGIT_REGEXP.test(c.value) ? null : {
      validateDigit: {
        valid: false,
      },
    };
  }
}