import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss'],
})
export class NumberSpinnerComponent implements OnInit {
  @Input() value: number;
  @Input() color: string;

  @Output() valueChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    if (!this.value) {
      this.updateValue(1);
    }
  }

  updateValue(value: number): void {
    this.value = value;
    console.log(value);
    this.valueChange.emit(this.value);
  }

  spinUp(): void {
    this.updateValue(this.value + 1);
  }

  spinDown(): void {
    this.updateValue(this.value - 1);
  }
}
