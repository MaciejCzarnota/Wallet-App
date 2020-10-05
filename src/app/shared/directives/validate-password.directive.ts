import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const hasNumber = /\d/.test(control.value);
    const hasLowerCaseCharacter = /[a-z]/.test(control.value);
    const hasUpperCaseCharacter = /[A-Z]/.test(control.value);
    const validationBoolean = hasNumber && hasLowerCaseCharacter && hasUpperCaseCharacter;
    return {passwordValidation: validationBoolean};
  };
}

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const containsOnlyAlphanumeric = control.value.match(/^[0-9a-zA-Z]+$/);
    return {usernameValidation: containsOnlyAlphanumeric};
  };
}
@Directive({
  selector: '[appValidatePassword]'
})
export class ValidatePasswordDirective {

  constructor() { }

}
