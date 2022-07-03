import { Component } from '@angular/core';
import { COLOR_LEFT, COLOR_RIGHT } from 'src/app/constants/colors.constants';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  leftColor = COLOR_LEFT;
  rightColor = COLOR_RIGHT;

  constructor(public tracksService: TracksService) {}
}
