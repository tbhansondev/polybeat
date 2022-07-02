import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlsComponent } from './controls.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ControlsComponent],
  exports: [ControlsComponent],
})
export class ControlsModule {}
