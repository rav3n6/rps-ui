import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoveSelectorComponent } from '../move-selector/move-selector.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import {RoundHistoryComponent} from "../round-history/round-history.component";

@Component({
  selector: 'app-game-page',
  imports: [RouterOutlet,MoveSelectorComponent,ScoreboardComponent,RoundHistoryComponent],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {

}
