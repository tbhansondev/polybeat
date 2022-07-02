import { Component, OnInit } from '@angular/core';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  constructor(public tracksService: TracksService) {}

  ngOnInit(): void {}
}
