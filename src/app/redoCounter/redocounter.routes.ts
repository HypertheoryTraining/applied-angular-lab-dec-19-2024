import { Routes } from '@angular/router';
import { RedocounterComponent } from './redocounter.component';
import { UiComponent } from './pages/ui.component';
export const ROUTES_REDOCOUNTER: Routes = [
  {
    path: '',
    component: RedocounterComponent,
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
    ],
  },
];
