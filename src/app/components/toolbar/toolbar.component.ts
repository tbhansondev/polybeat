import { Component } from '@angular/core';
import { AudioService } from 'src/app/services/audio/audio.service';
import { SideNavService } from 'src/app/services/side-nav/side-nav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    public audioService: AudioService,
    public sideNavService: SideNavService
  ) {}
}
