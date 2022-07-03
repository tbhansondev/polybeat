import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrackSuppressBtnComponent } from './track-suppress-btn.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [TrackSuppressBtnComponent],
  exports: [TrackSuppressBtnComponent],
})
export class TrackSuppressBtnModule {}
