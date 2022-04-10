import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Ball } from 'src/app/classes/ball/ball';
import { Circle } from 'src/app/classes/circle/circle';
import { Polygon } from 'src/app/classes/polygon/polygon';
import { TrackId } from 'src/app/enums/track-id/track-id';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { MathService } from 'src/app/services/math/math.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

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

    colorLeft = 'rgba(200, 0, 0, 1)';
    colorLeftMute = 'rgba(200, 0, 0, .2)'
    colorRight = 'rgba(0, 0, 200, 1)';
    colorRightMute = 'rgba(0, 0, 200, .2)';

    r = 100;
    x = 125;
    y = 125;
    rBall = 10;

    @ViewChild('canvas', { static: false }) canvasElement: ElementRef<HTMLCanvasElement>;

    readonly TRACK_ID = TrackId;

    constructor(public animationService: AnimationService, private mathService: MathService) {}

    ngAfterViewInit(): void {
        if (this.canvasElement?.nativeElement) {
            this.canvas = this.canvasElement.nativeElement;
            if (this.canvas?.getContext) {
                this.context = this.canvas.getContext('2d');
                if (this.context) {
                    this.ctx = this.context;
                    this.circle = new Circle(this.x, this.y, this.r, 'gray', this.ctx);
                    this.polyLeft = new Polygon(this.x, this.y, this.r, this.colorLeft, this.ctx);
                    this.ballLeft = new Ball(this.x, this.y, this.r, this.rBall, this.colorLeft, this.ctx);
                    this.polyRight = new Polygon(this.x, this.y, this.r, this.colorRight, this.ctx);
                    this.ballRight = new Ball(this.x, this.y, this.r, this.rBall, this.colorRight, this.ctx);
                    this.startAnimation();
                }
            }
            else {
                console.warn('browser does not support canvas');
            }
        }
    }

    startAnimation(): void {
        this.animationService.stop();
        this.setFramesPerBar();
        this.createShapes();
        this.refreshCanvas();
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
        const colorLeft = trackId && trackId !== TrackId.Left ? this.colorLeftMute : this.colorLeft;
        const colorRight = trackId && trackId !== TrackId.Right ? this.colorRightMute : this.colorRight;
        this.updateColor(this.polyLeft, this.ballLeft, colorLeft);
        this.updateColor(this.polyRight, this.ballRight, colorRight);
    }

    private updateColor(shape: Polygon, ball: Ball, color: string) {
        shape.updateColor(color);
        ball.updateColor(color);
    }
}
