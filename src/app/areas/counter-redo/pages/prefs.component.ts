import { Component, ChangeDetectionStrategy } from '@angular/core';
//import { types } from 'util';

export const BY_VALUES = [1, 3, 5] as const;
type ByValues = (typeof BY_VALUES)[number]; // createa  type like 1 | 3 | 5

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Preferences to be selected for Counter</p>
    <select
      #selectedPref
      class="select w-full max-w-xs"
      (change)="selectOption(selectedPref.value)"
    >
      @for (pref of preferencesList; track pref) {
        <option [value]="pref">{{ pref }}</option>
      }
      <!--
      <option value="1">1</option>
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="7">Lisa</option>
      <option value="9">Maggie</option>
-->
      <!--
@for (by of preferencesList; track by) {
      <option [value]="by">{{ by }}</option>
    }
      -->
    </select>
  `,
  styles: ``,
})
export class PrefsComponent {
  selectedPreference = '';
  selectOption(value: string) {
    //console.log(event?.target.value);
    //return "";
    this.selectedPreference = value;
    console.log(value);
  }
  preferencesList = [1, 3, 5, 7];
}
