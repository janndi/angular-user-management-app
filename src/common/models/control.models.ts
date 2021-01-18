import { FormControl } from '@angular/forms';
import { InfivexFormControlDetails } from './form-control.model';

export class InfivexControl extends FormControl {
  errorChecks: Array<InfivexFormControlDetails>;
  controlName: string;
  constructor(controlName = '', public _errorChecks: Array<InfivexFormControlDetails> = []) {
    super(
      '',
      _errorChecks.filter(t => !t.isAsync).map(ec => ec.validator),
      _errorChecks.filter(t => t.isAsync).map(ec => ec.validator)
    );
    this.errorChecks = _errorChecks;
    this.controlName = controlName;
  }
}
