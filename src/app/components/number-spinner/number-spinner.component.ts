import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss'],
})
export class NumberSpinnerComponent implements OnInit {
  @Input() value: number;
  @Input() color: string;
  @Input() min = 1;

  @Output() valueChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    if (!this.value) {
      this.updateValue(this.min);
    }
  }

  updateValue(value: number): void {
    if (value >= this.min) {
      this.value = value;
      this.valueChange.emit(this.value);
    }
  }

  spinUp(): void {
    this.updateValue(this.value + 1);
  }

  spinDown(): void {
    this.updateValue(this.value - 1);
  }
}
