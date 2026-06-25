import {
  CommonModule,
  DatePipe,
  TitleCasePipe
} from '@angular/common';

import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { GameRound } from '../game.models';

@Component({
  selector: 'app-round-history',
  imports: [
    CommonModule,
    DatePipe,
    TitleCasePipe,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './round-history.component.html',
  styleUrl: './round-history.component.css'
})
export class RoundHistoryComponent {
  @Input() rounds: readonly GameRound[] = [];
}