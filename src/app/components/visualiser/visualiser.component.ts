import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ITrack } from 'src/app/interfaces/track';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { AudioService } from 'src/app/services/audio/audio.service';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MathService } from 'src/app/services/math/math.service';
import { TracksService } from 'src/app/services/tracks/tracks.service';

@Component({
  selector: 'app-visualiser',
  templateUrl: './visualiser.component.html',
  styleUrls: ['./visualiser.component.scss'],
})
export class VisualiserComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() bpm: number = 90;

  @ViewChild('canvas', { static: false })
  canvasElement: ElementRef<HTMLCanvasElement>;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;

  sidesChanged$: Subscription;

  private framesPerBar: number;

  private readonly QUARTER_NOTES_PER_BAR = 4;

  constructor(
    private animationService: AnimationService,
    private audioService: AudioService,
    private mathService: MathService,
    private tracksService: TracksService,
    public canvasService: CanvasService
  ) {}

  ngAfterViewInit(): void {
    if (this.canvasElement?.nativeElement) {
      this.canvas = this.canvasElement.nativeElement;
      if (this.canvas?.getContext) {
        this.context = this.canvas.getContext('2d');
        if (this.context) {
          this.tracksService.init(this.context);
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

  ngOnInit(): void {
    this.sidesChanged$ = this.tracksService.sidesUpdated$.subscribe(() => {
      this.startAnimation();
    });
  }

  ngOnDestroy(): void {
    this.sidesChanged$.unsubscribe();
  }

  private startAnimation(): void {
    if (this.bpm > 0) {
      this.animationService.stop();
      this.setFramesPerBar();
      this.initTracks();
      this.refreshCanvas();
    }
  }

  private setFramesPerBar(): void {
    const fpm = this.animationService.fps * 60;
    this.framesPerBar = this.mathService.closestCommonMultipleToTarget(
      this.tracksService.left.sides,
      this.tracksService.right.sides,
      Math.round(fpm / (this.bpm / this.QUARTER_NOTES_PER_BAR))
    );
  }

  private initTracks(): void {
    const framesPerBar = this.framesPerBar;
    initTrack(this.tracksService.left);
    initTrack(this.tracksService.right);

    function initTrack(track: ITrack): void {
      track.polygon.createPath(track.sides);
      track.ball.createAnimationPath(track.polygon.path, framesPerBar);
    }
  }

  private drawTracks(): void {
    this.tracksService.circle.draw();
    this.tracksService.left.polygon.draw();
    this.tracksService.left.ball.draw();
    this.tracksService.right.polygon.draw();
    this.tracksService.right.ball.draw();
  }

  private refreshCanvas(): void {
    const ctx = this.tracksService.ctx;
    if (ctx) {
      this.animationService.start(() => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTracks();
      });
    }
  }
}
