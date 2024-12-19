import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-redocounter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: ` <!-- <div>Counter Stuff Goes Here</div> -->
    <a routerLink="ui" class="ui-link">GO to UI</a>
    <router-outlet />`,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f0f0f0;
      }

      .ui-link {
        font-size: 20px;
        color: #007bff;
        text-decoration: none;
        margin-bottom: 20px;
        transition: color 0.3s ease;
      }

      .ui-link:hover {
        color: #0056b3;
      }
    `,
  ],
})
export class RedocounterComponent {}
