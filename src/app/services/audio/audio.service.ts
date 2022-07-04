import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  dingalingLeft = new Audio('assets/tick_left.wav');
  dingalingRight = new Audio('assets/tick_right.wav');

  get muted(): boolean {
    return this._muted;
  }
  private _muted: boolean;

  get stereo(): boolean {
    return this._stereo;
  }
  private _stereo: boolean;

  private contextLeft = new AudioContext();
  private sourceLeft = this.contextLeft.createMediaElementSource(
    this.dingalingLeft
  );
  private panLeft = this.contextLeft.createStereoPanner();

  private contextRight = new AudioContext();
  private sourceRight = this.contextRight.createMediaElementSource(
    this.dingalingRight
  );
  private panRight = this.contextRight.createStereoPanner();

  private pan = 0.5;

  resumeContext(): void {
    this.contextLeft.resume();
    this.contextRight.resume();
  }

  toggleStereo(): void {
    if (this.stereo) {
      this.setMono();
    } else {
      this.setStereo();
    }
  }

  setStereo(): void {
    this._stereo = true;
    this.setPanning(this.pan);
  }

  setMono(): void {
    this._stereo = false;
    this.setPanning(0);
  }

  mute(): void {
    this._muted = !this._muted;
    this.dingalingLeft.muted = this._muted;
    this.dingalingRight.muted = this._muted;
  }

  private setPanning(pan: number): void {
    this.panLeft.pan.value = -pan;
    this.panRight.pan.value = pan;
    this.setAudioContext();
  }

  private setAudioContext(): void {
    this.sourceLeft.connect(this.panLeft);
    this.panLeft.connect(this.contextLeft.destination);
    this.sourceRight.connect(this.panRight);
    this.panRight.connect(this.contextRight.destination);
  }
}
