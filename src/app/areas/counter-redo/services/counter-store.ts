import { signal, computed, effect } from '@angular/core';

export class CounterStoreService {
  private readonly COUNTER_KEY = 'counter_value';
  private readonly STEP_KEY = 'counter_step';
  //Signals to manage state
  private _counter = signal(this.loadFromLocalStorage(this.COUNTER_KEY, 0));
  private _step = signal(this.loadFromLocalStorage(this.COUNTER_KEY, 1));

  //Public computed signals
  counter = computed(() => this._counter()); // Access counter value
  step = computed(() => this._step()); // Access step value

  constructor() {
    effect(() => {
      this.saveToLocalStorage(this.COUNTER_KEY, this._counter());
    });

    effect(() => {
      this.saveToLocalStorage(this.STEP_KEY, this._step());
    });
  }

  //Methods to update the state
  increment() {
    this._counter.set(this._counter() + this._step());
  }

  //Decrement function (prevents going below zero)
  decrement() {
    const newValue = this._counter() - this._step();
    this._counter.set(newValue < 0 ? 0 : newValue); //Ensure it doesn't go below zero
  }

  setStep(step: number) {
    this._step.set(step); //Update the step value
  }

  private loadFromLocalStorage(key: string, defaultValue: number): number {
    const value = localStorage.getItem(key);
    return value !== null ? parseInt(value, 10) : defaultValue;
  }

  private saveToLocalStorage(key: string, value: number): void {
    localStorage.setItem(key, value.toString());
  }
}
