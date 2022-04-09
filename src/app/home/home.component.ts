import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;

    @ViewChild('canvas', { static: false }) canvasElement: ElementRef<HTMLCanvasElement>;

    ngAfterViewInit(): void {
        if (this.canvasElement?.nativeElement) {
            this.canvas = this.canvasElement.nativeElement;
            if (this.canvas?.getContext) {
                this.context = this.canvas.getContext('2d');
                this.draw();
            }
            else {
                console.warn('browser does not support canvas');
            }
        }
    }

    draw(): void {
        const ctx = this.context;

        if (ctx) {
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(10, 10, 50, 50);
    
            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(30, 30, 50, 50);
        }
    }

}
