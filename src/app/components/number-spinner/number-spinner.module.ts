import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberSpinnerComponent } from './number-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NumberSpinnerComponent],
  exports: [NumberSpinnerComponent],
})
export class NumberSpinnerModule {}
