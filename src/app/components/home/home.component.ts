import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Ball } from 'src/app/classes/ball/ball';
import { Polygon } from 'src/app/classes/polygon/polygon';

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

    polyLeft: Polygon;
    polyRight: Polygon;

    ballLeft: Ball;
    ballRight: Ball;

    colorLeft = 'red';
    colorRight = 'blue';

    r = 100;
    x = 125;
    y = 125;
    rBall = 10;

    @ViewChild('canvas', { static: false }) canvasElement: ElementRef<HTMLCanvasElement>;

    ngAfterViewInit(): void {
        if (this.canvasElement?.nativeElement) {
            this.canvas = this.canvasElement.nativeElement;
            if (this.canvas?.getContext) {
                this.context = this.canvas.getContext('2d');
                if (this.context) {
                    this.ctx = this.context;
                    this.polyLeft = new Polygon(this.x, this.y, this.r, this.colorLeft, this.ctx);
                    this.ballLeft = new Ball(this.x, this.y, this.r, this.rBall, this.colorLeft, this.ctx);
                    this.polyRight = new Polygon(this.x, this.y, this.r, this.colorRight, this.ctx);
                    this.ballRight = new Ball(this.x, this.y, this.r, this.rBall, this.colorRight, this.ctx);
                    this.refreshCanvas();
                }
            }
            else {
                console.warn('browser does not support canvas');
            }
        }
    }

    refreshCanvas(refreshShapes?: boolean): void {
        if (this.ctx) {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.drawShapes(refreshShapes);
            this.raf = window.requestAnimationFrame(this.refreshCanvas.bind(this, false));
        }
    }

    drawShapes(refreshShapes?: boolean): void {
        if (refreshShapes) {
            window.cancelAnimationFrame(this.raf);
        }
        this.polyLeft.draw(this.sidesLeft);
        if (refreshShapes || !this.ballLeft.path) {
            this.ballLeft.createPath(this.polyLeft.path, this.sidesLeft);
        }
        this.ballLeft.draw();
        this.polyRight.draw(this.sidesRight);
        if (refreshShapes || !this.ballRight.path) {
            this.ballRight.createPath(this.polyRight.path, this.sidesRight);
        }
        this.ballRight.draw();
    }

    startAnimation(): void {
        this.ballLeft.resetPosition();
        // this.raf = window.requestAnimationFrame(this.refreshCanvas.bind(this));
    }
}
