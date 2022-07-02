import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisualiserComponent } from './visualiser.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VisualiserComponent],
  exports: [VisualiserComponent],
})
export class VisualiserModule {}
