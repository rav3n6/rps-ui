import { Component } from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-move-selector',
  imports: [MatSlideToggle,MatButtonModule,MatIconModule, MatDividerModule],
  templateUrl: './move-selector.component.html',
  styleUrls: ['./move-selector.component.css']
})
export class MoveSelectorComponent {

}
