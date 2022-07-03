import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-track-suppress-btn',
  templateUrl: './track-suppress-btn.component.html',
  styleUrls: ['./track-suppress-btn.component.scss'],
})
export class TrackSuppressBtnComponent {
  @Input() color: string;
  @Input() isSuppressed: boolean;

  @Output() btnClick = new EventEmitter<void>();

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
