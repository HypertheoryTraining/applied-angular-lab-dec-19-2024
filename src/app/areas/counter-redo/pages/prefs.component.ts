import { Component } from '@angular/core';
import { CounterStoreService } from '../services/counter-store';

@Component({
  selector: 'app-prefs',
  imports: [],
  template: `
    <h3>Select Step Size</h3>
    <button (click)="setStep(1)">Count by 1</button>
    <button (click)="setStep(3)">Count by 3</button>
    <button (click)="setStep(5)">Count by 5</button>
  `,
  styles: ``,
})
export class PrefsComponent {
  constructor(private counterStore: CounterStoreService) {}

  setStep(value: number) {
    this.counterStore.setStep(value);
  }
}
