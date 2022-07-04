import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { KoFiBtnModule } from '../ko-fi-btn/ko-fi-btn.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [CommonModule, KoFiBtnModule, MatDividerModule, MatIconModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavModule {}
