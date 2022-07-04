import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ControlsModule } from '../controls/controls.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { VisualiserModule } from '../visualiser/visualiser.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidenavModule,
    ToolbarModule,
    VisualiserModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
