import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scoreboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  @Input() playerWins = 0;
  @Input() computerWins = 0;
  @Input() draws = 0;
}