import { FormControl } from '@angular/forms';

export class FormControlDetails {
  messageKey: string;
  getMessageInterpolationParams?: () => { [key: string]: string };
  check: (control: FormControl) => boolean;
  validator: any;
  isAsync = false;
}
