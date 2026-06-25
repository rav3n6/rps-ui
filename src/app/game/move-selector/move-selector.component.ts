import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Move } from '../game.models';

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
  @Input() disabled = false;

  @Output() moveSelected = new EventEmitter<Move>();

  selectMove(move: Move): void {
    if (this.disabled) {
      return;
    }

    this.moveSelected.emit(move);
  }
}