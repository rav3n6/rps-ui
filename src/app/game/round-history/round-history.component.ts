import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export type Move = 'ROCK' | 'PAPER' | 'SCISSORS';

export type RoundResult =
  | 'PLAYER_WIN'
  | 'COMPUTER_WIN'
  | 'DRAW';

export interface RoundHistoryItem {
  roundNumber: number;
  playerMove: Move;
  computerMove: Move;
  result: RoundResult;
  playedAt: string;
}

@Component({
  selector: 'app-round-history',
  imports: [
    DatePipe,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './round-history.component.html',
  styleUrl: './round-history.component.css'
})
export class RoundHistoryComponent {
  readonly rounds = input<readonly RoundHistoryItem[]>([]);
}