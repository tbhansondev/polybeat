import { Shape } from "../shape/shape";

export class Circle extends Shape {

    constructor(x: number, y: number, r: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, r, color, ctx);
    }

    draw(): void {
        this.setTransform();
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }
}
