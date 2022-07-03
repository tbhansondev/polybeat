import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('input', { read: ElementRef }) inputRef: ElementRef;

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
    if (this.isValid(value)) {
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

  onBlur(): void {
    const el = this.inputRef.nativeElement;
    if (!this.isValid(el.value)) {
      el.value = this.value;
    }
  }

  isValid(value: number): boolean {
    return value >= this.min;
  }
}
