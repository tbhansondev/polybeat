export class Shape {
    x: number;
    y: number;
    r: number;
    color: string;
    ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, r: number, color: string, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.ctx = ctx;
    }
}
