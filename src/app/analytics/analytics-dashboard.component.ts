import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { TitleCasePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { GameStateService } from '../game/game-state.service';

@Component({
  selector: 'app-analytics-dashboard',
  imports: [
    TitleCasePipe,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent
  implements OnInit {

  private readonly gameState =
    inject(GameStateService);

  readonly statistics =
    this.gameState.statistics;

  readonly loading = this.gameState.loading;

  readonly error = this.gameState.error;

  readonly moveDistribution =
    this.gameState.moveDistribution;

  readonly mostPlayedMove =
    this.gameState.mostPlayedMove;

  readonly lossRate = this.gameState.lossRate;

  readonly drawRate = this.gameState.drawRate;

  ngOnInit(): void {
    void this.gameState.loadGame();
  }

  movePercentage(count: number): number {
    const total = this.statistics().totalRounds;

    if (total === 0) {
      return 0;
    }

    return Math.round((count / total) * 100);
  }
}