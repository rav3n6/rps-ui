import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Move } from '../game-page/game.models'

@Component({
  selector: 'app-move-selector',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './move-selector.component.html',
  styleUrl: './move-selector.component.css'
})
export class MoveSelectorComponent {
  readonly moveSelected = output<Move>();

  selectMove(move: Move): void {
    this.moveSelected.emit(move);
  }
}