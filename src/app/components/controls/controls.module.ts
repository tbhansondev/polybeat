import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NumberSpinnerModule } from '../number-spinner/number-spinner.module';
import { TrackSuppressBtnModule } from '../track-suppress-btn/track-suppress-btn.module';
import { ControlsComponent } from './controls.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    NumberSpinnerModule,
    TrackSuppressBtnModule,
  ],
  declarations: [ControlsComponent],
  exports: [ControlsComponent],
})
export class ControlsModule {}
