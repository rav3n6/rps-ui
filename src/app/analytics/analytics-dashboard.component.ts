import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { GameStateService } from '../game/game-state.service';

@Component({
  selector: 'app-analytics-dashboard',
  imports: [
    CommonModule,
    TitleCasePipe,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent implements OnInit {
  constructor(public readonly gameState: GameStateService) {}

  ngOnInit(): void {
    void this.gameState.loadGame();
  }

  movePercentage(count: number, total: number): number {
    if (total === 0) {
      return 0;
    }

    return Math.round((count / total) * 100);
  }
}