import { Component } from '@angular/core';
import { AudioService } from 'src/app/services/audio/audio.service';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { SideNavService } from 'src/app/services/side-nav/side-nav.service';
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
    public sideNavService: SideNavService,
    public tracksService: TracksService
  ) {}

  openSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
