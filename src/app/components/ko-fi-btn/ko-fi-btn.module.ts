import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KoFiBtnComponent } from './ko-fi-btn.component';

@NgModule({
  imports: [CommonModule],
  declarations: [KoFiBtnComponent],
  exports: [KoFiBtnComponent],
})
export class KoFiBtnModule {}
