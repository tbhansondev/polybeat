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

    setTransform(): void {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(-90 * Math.PI / 180);
    }

    updateColor(color: string): void {
        this.color = color;
    }
}
