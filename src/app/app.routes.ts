import { Routes } from '@angular/router';
import { GamePageComponent } from './game/game-page/game-page.component';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';

export const routes: Routes = [
    {path: '', component: GamePageComponent},
    {path: 'analytics', component: AnalyticsComponent},
];
