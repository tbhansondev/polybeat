import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  set shapeSize(size: number) {
    this._shapeSize = size;
    this.setDimensions();
  }
  get shapeSize(): number {
    return this._shapeSize;
  }
  private _shapeSize: number;

  scale = 2.5;
  ballSize: number;
  lineWidth: number;
  canvasSize: number;
  canvasCenter: number;

  private readonly BALL_SCALE = 0.1;
  private readonly CANVAS_PADDING = 10;

  constructor() {
    this.shapeSize = 100 * this.scale;
  }

  setDimensions(): void {
    this.ballSize = this.shapeSize * this.BALL_SCALE;
    this.canvasCenter = this.shapeSize + this.ballSize + this.CANVAS_PADDING;
    this.canvasSize = this.canvasCenter * 2;
  }
}
