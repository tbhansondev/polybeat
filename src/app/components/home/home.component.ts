import { Component } from '@angular/core';
import { AudioService } from 'src/app/services/audio/audio.service';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sidenavOpen: boolean;

  constructor(
    public audioService: AudioService,
    public canvasService: CanvasService,
    public tracksService: TracksService
  ) {}

  toggleStereo(): void {
    if (this.audioService.stereo) {
      this.audioService.setMono();
    } else {
      this.audioService.setStereo();
    }
  }

  openSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
