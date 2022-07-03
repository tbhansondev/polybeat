import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ball } from 'src/app/classes/ball/ball';
import { Circle } from 'src/app/classes/circle/circle';
import { Polygon } from 'src/app/classes/polygon/polygon';
import {
  COLOR_LEFT,
  COLOR_LEFT_SUPPRESSED,
  COLOR_RIGHT,
  COLOR_RIGHT_SUPPRESSED,
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

  set sidesLeft(sides: number) {
    this.updateSides(this.left, sides);
  }
  get sidesLeft(): number {
    return this.left.sides;
  }

  set sidesRight(sides: number) {
    this.updateSides(this.right, sides);
  }
  get sidesRight(): number {
    return this.right.sides;
  }

  set suppressedLeft(isSuppressed: boolean) {
    this.updateSuppressedTrack(this.left, isSuppressed);
  }
  get suppressedLeft(): boolean {
    return this.left.isSuppressed;
  }

  set suppressedRight(isSuppressed: boolean) {
    this.updateSuppressedTrack(this.right, isSuppressed);
  }
  get suppressedRight(): boolean {
    return this.right.isSuppressed;
  }

  sidesUpdated$ = new BehaviorSubject<{ old?: number; new?: number }>({});

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

  suppressLeft(): void {
    this.suppressedLeft = !this.suppressedLeft;
  }

  suppressRight(): void {
    this.suppressedRight = !this.suppressedRight;
  }

  private updateSides(track: ITrack, sides: number): void {
    const oldSides = track.sides;
    const newSides = sides;
    track.sides = newSides;
    this.sidesUpdated$.next({ old: oldSides, new: newSides });
  }

  private updateSuppressedTrack(track: ITrack, isSuppressed: boolean): void {
    this.setColorBase(this.left);
    this.setColorBase(this.right);
    if (isSuppressed) {
      this.setColorSuppressed(track);
    }
  }

  private setColorBase(track: ITrack): void {
    track.polygon.color = track.color;
    track.ball.color = track.color;
    track.isSuppressed = false;
  }

  private setColorSuppressed(track: ITrack): void {
    track.polygon.color = track.colorSuppressed;
    track.ball.color = track.colorSuppressed;
    track.isSuppressed = true;
  }

  private createAll(): void {
    this.circle = this.createCircle();
    this.left = this.createTrack(
      DEFAULT_SIDES_LEFT,
      COLOR_LEFT,
      COLOR_LEFT_SUPPRESSED,
      this.audioService.dingalingLeft
    );
    this.right = this.createTrack(
      DEFAULT_SIDES_RIGHT,
      COLOR_RIGHT,
      COLOR_RIGHT_SUPPRESSED,
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
    colorSuppressed: string,
    dingaling: HTMLAudioElement
  ): ITrack {
    return {
      sides,
      color,
      colorSuppressed,
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
      isSuppressed: false,
    };
  }
}
