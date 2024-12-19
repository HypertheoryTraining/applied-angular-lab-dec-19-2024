import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { PrefsComponent } from './pages/prefs.component';
import { UiComponent } from './pages/ui.component';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterComponent,
    children: [
      {
        path: 'ui',
        component: UiComponent,
        children: [],
      },
      {
        path: 'prefs',
        component: PrefsComponent,
        children: [],
      },
    ],
  },
];
