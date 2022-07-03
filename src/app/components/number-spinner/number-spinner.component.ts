import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss'],
})
export class NumberSpinnerComponent implements OnInit {
  @Input() value: number;
  @Input() color: string;
  @Input() icon: string;
  @Input() min = 1;
  @Input() customIncrement: number;

  @Output() valueChange = new EventEmitter<number>();

  valueUpdate$ = new Subject<number>();

  constructor() {}

  ngOnInit(): void {
    if (!this.value) {
      this.updateValue(this.min);
    }
    this.valueUpdate$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.updateValue(value);
      });
  }

  updateValue(value: number): void {
    if (value >= this.min) {
      this.value = value;
      this.valueChange.emit(this.value);
    }
  }

  spinUp(increment: number): void {
    this.updateValue(this.value + increment);
  }

  spinDown(increment: number): void {
    this.updateValue(this.value - increment);
  }
}
