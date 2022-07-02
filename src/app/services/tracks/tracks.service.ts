import { Injectable } from '@angular/core';
import { Ball } from 'src/app/classes/ball/ball';
import { Circle } from 'src/app/classes/circle/circle';
import { Polygon } from 'src/app/classes/polygon/polygon';
import {
  COLOR_LEFT,
  COLOR_LEFT_MUTED,
  COLOR_RIGHT,
  COLOR_RIGHT_MUTED,
} from 'src/app/constants/colors.constants';
import {
  DEFAULT_SIDES_LEFT,
  DEFAULT_SIDES_RIGHT,
} from 'src/app/constants/defaults.constants';
import { ITrack } from 'src/app/interfaces/track';
import { AudioService } from '../audio/audio.service';
import { CanvasService } from '../canvas/canvas.service';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  ctx: CanvasRenderingContext2D;

  left: ITrack;
  right: ITrack;
  circle: Circle;

  constructor(
    private audioService: AudioService,
    private canvasService: CanvasService
  ) {}

  init(ctx: CanvasRenderingContext2D): void {
    if (ctx) {
      this.ctx = ctx;
      this.createAll();
    }
  }

  focusLeft(): void {
    this.setColorBase(this.right);
    if (this.left.polygon.color === this.left.color) {
      this.setColorMuted(this.left);
    } else {
      this.setColorBase(this.left);
    }
  }

  focusRight(): void {
    this.setColorBase(this.left);
    if (this.right.polygon.color === this.right.color) {
      this.setColorMuted(this.right);
    } else {
      this.setColorBase(this.right);
    }
  }

  private setColorBase(track: ITrack): void {
    track.polygon.color = track.color;
    track.ball.color = track.color;
  }

  private setColorMuted(track: ITrack): void {
    track.polygon.color = track.colorMuted;
    track.ball.color = track.colorMuted;
  }

  private createAll(): void {
    this.circle = this.createCircle();
    this.left = this.createTrack(
      DEFAULT_SIDES_LEFT,
      COLOR_LEFT,
      COLOR_LEFT_MUTED,
      this.audioService.dingalingLeft
    );
    this.right = this.createTrack(
      DEFAULT_SIDES_RIGHT,
      COLOR_RIGHT,
      COLOR_RIGHT_MUTED,
      this.audioService.dingalingRight
    );
  }

  private createCircle(): Circle {
    return new Circle(
      this.canvasService.canvasCenter,
      this.canvasService.canvasCenter,
      this.canvasService.shapeSize,
      'gray',
      this.ctx
    );
  }

  private createTrack(
    sides: number,
    color: string,
    colorMuted: string,
    dingaling: HTMLAudioElement
  ): ITrack {
    return {
      sides,
      color,
      colorMuted,
      polygon: new Polygon(
        this.canvasService.canvasCenter,
        this.canvasService.canvasCenter,
        this.canvasService.shapeSize,
        color,
        this.ctx
      ),
      ball: new Ball(
        this.canvasService.canvasCenter,
        this.canvasService.canvasCenter,
        this.canvasService.shapeSize,
        this.canvasService.ballSize,
        color,
        dingaling,
        this.ctx
      ),
    };
  }
}
