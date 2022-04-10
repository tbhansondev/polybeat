import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Ball } from 'src/app/classes/ball/ball';
import { Circle } from 'src/app/classes/circle/circle';
import { Polygon } from 'src/app/classes/polygon/polygon';
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

    speed: number;
    
    circle: Circle;

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

    constructor(private mathService: MathService) {}

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
        window.cancelAnimationFrame(this.raf);
        this.setSpeed();
        this.createShapes();
        this.refreshCanvas();
    }

    refreshCanvas(): void {
        if (this.ctx) {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawShapes();
            this.raf = window.requestAnimationFrame(this.refreshCanvas.bind(this));
        }
    }
    
    createShapes(): void {
        this.polyLeft.createPath(this.sidesLeft);
        this.ballLeft.createAnimationPath(this.polyLeft.path, this.speed);
        this.polyRight.createPath(this.sidesRight);
        this.ballRight.createAnimationPath(this.polyRight.path, this.speed);
    }

    drawShapes(): void {
        this.circle.draw();
        this.polyLeft.draw();
        this.ballLeft.draw();
        this.polyRight.draw();
        this.ballRight.draw();
    }

    setSpeed(): void {
        this.speed = this.mathService.lowestCommonMultiple(this.sidesLeft, this.sidesRight);
        console.log(this.speed);
    }
}
