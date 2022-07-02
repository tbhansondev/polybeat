import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Ball } from 'src/app/classes/ball/ball';
import { Circle } from 'src/app/classes/circle/circle';
import { Polygon } from 'src/app/classes/polygon/polygon';
import { TrackId } from 'src/app/enums/track-id/track-id';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { AudioService } from 'src/app/services/audio/audio.service';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MathService } from 'src/app/services/math/math.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  sidenavOpen: boolean;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  ctx: CanvasRenderingContext2D;
  raf: number;

  sidesLeft = 4;
  sidesRight = 3;

  bpm = 90;
  quarterNotesPerBar = 4;
  framesPerBar: number;

  circle: Circle;

  polyLeft: Polygon;
  polyRight: Polygon;

  ballLeft: Ball;
  ballRight: Ball;

  colorLeft = 'rgba(231, 76, 60,1.0)';
  colorLeftMute = 'rgba(231, 76, 60,0.2)';
  colorRight = 'rgba(52, 152, 219,1.0)';
  colorRightMute = 'rgba(52, 152, 219,0.2)';

  canvasScale = 1;

  r = 100;
  x = 110;
  y = 110;
  rBall = 10;

  @ViewChild('canvas', { static: false })
  canvasElement: ElementRef<HTMLCanvasElement>;

  readonly TRACK_ID = TrackId;

  constructor(
    private animationService: AnimationService,
    private mathService: MathService,
    public audioService: AudioService,
    public canvasService: CanvasService
  ) {}

  ngAfterViewInit(): void {
    if (this.canvasElement?.nativeElement) {
      this.canvas = this.canvasElement.nativeElement;
      if (this.canvas?.getContext) {
        this.context = this.canvas.getContext('2d');
        if (this.context) {
          this.ctx = this.context;
          this.circle = new Circle(
            this.canvasService.canvasCenter,
            this.canvasService.canvasCenter,
            this.canvasService.shapeSize,
            'gray',
            this.ctx
          );
          this.polyLeft = new Polygon(
            this.canvasService.canvasCenter,
            this.canvasService.canvasCenter,
            this.canvasService.shapeSize,
            this.colorLeft,
            this.ctx
          );
          this.ballLeft = new Ball(
            this.canvasService.canvasCenter,
            this.canvasService.canvasCenter,
            this.canvasService.shapeSize,
            this.canvasService.ballSize,
            this.colorLeft,
            this.audioService.dingalingLeft,
            this.ctx
          );
          this.polyRight = new Polygon(
            this.canvasService.canvasCenter,
            this.canvasService.canvasCenter,
            this.canvasService.shapeSize,
            this.colorRight,
            this.ctx
          );
          this.ballRight = new Ball(
            this.canvasService.canvasCenter,
            this.canvasService.canvasCenter,
            this.canvasService.shapeSize,
            this.canvasService.ballSize,
            this.colorRight,
            this.audioService.dingalingRight,
            this.ctx
          );
          this.audioService.setStereo();

          // ----- REMOVE
          this.audioService.mute();
          // ----- REMOVE

          this.startAnimation();
        }
      } else {
        console.warn('browser does not support canvas');
      }
    }
  }

  startAnimation(): void {
    if (this.bpm > 0) {
      this.animationService.stop();
      this.setFramesPerBar();
      this.createShapes();
      this.refreshCanvas();
    }
  }

  refreshCanvas(): void {
    if (this.ctx) {
      this.animationService.start(() => {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawShapes();
      });
    }
  }

  createShapes(): void {
    this.polyLeft.createPath(this.sidesLeft);
    this.ballLeft.createAnimationPath(this.polyLeft.path, this.framesPerBar);
    this.polyRight.createPath(this.sidesRight);
    this.ballRight.createAnimationPath(this.polyRight.path, this.framesPerBar);
  }

  drawShapes(): void {
    this.circle.draw();
    this.polyLeft.draw();
    this.ballLeft.draw();
    this.polyRight.draw();
    this.ballRight.draw();
  }

  setFramesPerBar(): void {
    const fpm = this.animationService.fps * 60;
    this.framesPerBar = this.mathService.closestCommonMultipleToTarget(
      this.sidesLeft,
      this.sidesRight,
      Math.round(fpm / (this.bpm / this.quarterNotesPerBar))
    );
  }

  focusTrack(trackId?: TrackId): void {
    const colorLeft =
      trackId && trackId !== TrackId.Left ? this.colorLeftMute : this.colorLeft;
    const colorRight =
      trackId && trackId !== TrackId.Right
        ? this.colorRightMute
        : this.colorRight;
    this.updateColor(this.polyLeft, this.ballLeft, colorLeft);
    this.updateColor(this.polyRight, this.ballRight, colorRight);
  }

  private updateColor(shape: Polygon, ball: Ball, color: string): void {
    shape.updateColor(color);
    ball.updateColor(color);
  }

  openSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
