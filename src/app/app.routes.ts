import { Routes } from '@angular/router';

import {
  AnalyticsDashboardComponent
} from './analytics/analytics-dashboard.component';


import {
  GamePageComponent
} from './game/game-page/game-page.component';

export const routes: Routes = [
  {
    path: '',
    component: GamePageComponent
  },
  {
    path: 'analytics',
    component: AnalyticsDashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];