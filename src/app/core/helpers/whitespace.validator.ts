import { AbstractControl } from '@angular/forms';

export function removeLeadingTrailSpaces(control: AbstractControl) {
  if (control && (control.value || '').match(/\s/g)) {
    control.setValue(control.value.trim());
  }
  return null;
}