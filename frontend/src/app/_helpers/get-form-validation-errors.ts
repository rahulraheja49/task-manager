import {
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

export var checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let pass = group.get('password').value;
  let confirmPass = group.get('password2').value;
  return pass === confirmPass ? null : { passwordMismatch: true };
};

export var requirePhoneOrEmail: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let email = group.get('email').value;
  let phone = group.get('phone').value;
  if (email || phone) return null;
  else return { bothPhoneAndEmailNull: true };
};

function mapKey(key) {
  switch (key) {
    case 'lname':
      return 'Last Name';
    case 'fname':
      return 'First Name';
    case 'ownership':
      return 'Ownership';
    case 'name':
      return 'Company Name';
    default:
      return key;
  }
}

function beautify(key, keyError) {
  switch (keyError) {
    case 'pattern':
      if (key == 'phone') return 'Invalid characters in phone number.';
      else if (key == 'ownership') return `Ownership should be a number`;
      else if (key == 'price') return `Price should be a number`;
      else if (key == 'min_purchase')
        return `Minimum purchase should be a number`;
      else if (key == 'funding' || key == 'valuation')
        return `Enter valid ${key}`;
      return 'Check ' + key.replace('-', ' ') + ' format.';
    case 'minlength':
      if (key == 'password2') {
        return 'Password is too short.';
      }
      return mapKey(key) + ' is too short.';
    case 'max':
      return mapKey(key) + ' value is greater than expected maximum.';
    case 'required':
      if (key == 'password2') {
        return 'Both Passwords are required.';
      }
      return mapKey(key) + ' is required.';
    case 'passwordMismatch':
      return "Passwords didn't match.";
    case 'bothPhoneAndEmailNull':
      return 'At least one of email or phone is required.';
    default:
      return mapKey(key) + ': ' + keyError;
  }
}

export function getFormValidationErrors(form: FormGroup) {
  const result = [];
  Object.keys(form.controls).forEach((key) => {
    const controlErrors: ValidationErrors = form.get(key).errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach((keyError) => {
        result.push({
          control: key,
          error: keyError,
          message: beautify(key, keyError),
        });
      });
    }
  });

  if (form.errors) {
    Object.keys(form.errors).forEach((key) => {
      result.push({
        control: 'form',
        error: key,
        message: beautify('form', key),
      });
    });
  }

  return result;
}
