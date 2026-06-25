import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MoveSelectorComponent } from '../move-selector/move-selector.component';
import { RoundHistoryComponent } from '../round-history/round-history.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

import { GameStateService } from '../game-state.service';
import { Move } from '../game.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-page',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MoveSelectorComponent,
    ScoreboardComponent,
    RoundHistoryComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {
  readonly resultMessage$: Observable<string>;

  constructor(public readonly gameState: GameStateService) {
    this.resultMessage$ = this.gameState.lastRound$.pipe(
      map(round => {
        if (round === null) {
          return '';
        }

        switch (round.result) {
          case 'WIN':
            return 'You won this round!';

          case 'LOSS':
            return 'Computer won this round';

          case 'DRAW':
            return 'This round was a draw';
          default:
            return '';
        }
      })
    );
  }

  ngOnInit(): void {
    void this.gameState.loadGame();
  }

  onMoveSelected(move: Move): void {
    void this.gameState.playRound(move);
  }

  resetSession(): void {
    void this.gameState.resetGame();
  }
}