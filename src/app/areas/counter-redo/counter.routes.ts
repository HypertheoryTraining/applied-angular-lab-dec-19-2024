import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { UiComponent } from './pages/ui.component';
import { PrefsComponent } from './pages/prefs.component';
import { CounterStoreService } from './services/counter-store';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    providers: [CounterStoreService],
    component: CounterComponent,
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
    ],
  },
];
