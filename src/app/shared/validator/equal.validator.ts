import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValidator(firstControlName: string, secondControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    // First get the other control
    const firstControl = control.get(firstControlName);
    if (!firstControl) {
      return null;
    }

    const secondControl = control.get(secondControlName);
    if (!secondControl) {
      return null;
    }

    const isEqual = firstControl.value === secondControl.value;
    return isEqual ? null : {
      'equal': { value: control.value }
    };
  };
}
