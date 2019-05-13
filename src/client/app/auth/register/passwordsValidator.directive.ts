import { AbstractControl } from '@angular/forms';

export const passwordsMatchValidator = (registrationForm: AbstractControl): {[key: string]: boolean} => {

  const password = registrationForm.get('password');
  const repeatPassword = registrationForm.get('repeatPassword');

  if (password && repeatPassword && password.value !== repeatPassword.value) {
    return { 'passwordsDoNotMatch': true };
  } else {
    return null;
  }
};
