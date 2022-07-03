import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberSpinnerModule } from '../number-spinner/number-spinner.module';
import { ControlsComponent } from './controls.component';

@NgModule({
  imports: [CommonModule, NumberSpinnerModule],
  declarations: [ControlsComponent],
  exports: [ControlsComponent],
})
export class ControlsModule {}
