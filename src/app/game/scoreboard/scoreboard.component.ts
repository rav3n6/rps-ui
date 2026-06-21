import { Component, input } from '@angular/core';
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
  readonly playerWins = input(0);
  readonly computerWins = input(0);
  readonly draws = input(0);
}