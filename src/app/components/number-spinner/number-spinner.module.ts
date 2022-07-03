import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NumberSpinnerComponent } from './number-spinner.component';

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  declarations: [NumberSpinnerComponent],
  exports: [NumberSpinnerComponent],
})
export class NumberSpinnerModule {}
