import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoveSelectorComponent } from '../move-selector/move-selector.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import {RoundHistoryComponent} from "../round-history/round-history.component";
import { Move } from './game.models';

@Component({
  selector: 'app-game-page',
  imports: [RouterOutlet,MoveSelectorComponent,ScoreboardComponent,RoundHistoryComponent],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {

  selectedMove: Move | null = null;

  onMoveSelected(move: Move): void {
  this.selectedMove = move;
}
}
