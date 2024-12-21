import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <p>You want to see the details of post {{ id() }}</p>
    <a class="btn btn-primary" routerLink="../../">Back To List</a>
  `,
  styles: ``,
})
export class DetailsComponent {
  id = input<string>();

  constructor() {
    //effect(() => console.log(this.id()));
  }
}
