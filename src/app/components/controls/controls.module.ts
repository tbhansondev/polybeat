import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberSpinnerModule } from '../number-spinner/number-spinner.module';
import { TrackSuppressBtnModule } from '../track-suppress-btn/track-suppress-btn.module';
import { ControlsComponent } from './controls.component';

@NgModule({
  imports: [CommonModule, NumberSpinnerModule, TrackSuppressBtnModule],
  declarations: [ControlsComponent],
  exports: [ControlsComponent],
})
export class ControlsModule {}
