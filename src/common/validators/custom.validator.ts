import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";
import { Injectable } from "@angular/core";

import { UsersService } from "src/app/users/users.service";
import { Observer, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomValidators {
  constructor(private userService: UsersService) {}

  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }

  static hasCapitalCase(): ValidatorFn {
    return (formControl: FormControl): { [key: string]: boolean } | null => {
      if ((formControl.value ? formControl.value : "").match(/[A-Z]/)) {
        return null;
      }
      return { hasCapitalCase: true };
    };
  }

  static hasSmallCase(): ValidatorFn {
    return (formControl: FormControl): { [key: string]: boolean } | null => {
      if ((formControl.value ? formControl.value : "").match(/[a-z]/)) {
        return null;
      }
      return { hasSmallCase: true };
    };
  }

  static hasDigit(): ValidatorFn {
    return (formControl: FormControl): { [key: string]: boolean } | null => {
      if ((formControl.value ? formControl.value : "").match(/\d/)) {
        return null;
      }
      return { hasDigit: true };
    };
  }

  static positiveNumbersOnly(): ValidatorFn {
    return (formControl: FormControl): { [key: string]: boolean } | null => {
      if ((formControl.value ? formControl.value : 0) < 0) {
        return null;
      }
      return { positiveNumbersOnly: true };
    };
  }

  emailAsyncValidator(): ValidatorFn {
    return (control: FormControl) =>
      new Observable((observer: Observer<ValidationErrors | null>) => {
        this.userService
          .validateEmail(control.value)
          .toPromise()
          .then(() => {
            observer.next(null);
          })
          .catch((err) => {
            observer.next({ error: true, duplicatedEmail: true });
          })
          .finally(() => {
            observer.complete();
          });
      });
  }
}
