import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_BPM } from 'src/app/constants/defaults.constants';

@Injectable({
  providedIn: 'root',
})
export class BpmService {
  set bpm(bpm: number) {
    this._bpm = bpm;
    this.bpmUpdated$.next(this.bpm);
  }
  get bpm(): number {
    return this._bpm;
  }
  private _bpm = DEFAULT_BPM;

  bpmUpdated$ = new BehaviorSubject<number>(this.bpm);
}
