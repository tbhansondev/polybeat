import { ICoordinates } from "src/app/interfaces/coordinates";
import { Shape } from "../shape/shape";

export class Polygon extends Shape {
    path: ICoordinates[];

    constructor(x: number, y: number, r: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, r, color, ctx);
    }

    draw(sides: number): void {
        const r = 100;
        const x = 125;
        const y = 125;
        const a = 2 * Math.PI / sides;

        this.path = [];
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.beginPath();
        this.ctx.translate(x, y);
        this.ctx.moveTo(r, 0);
        for (let i = 1; i <= sides; i++) {
            this.lineTo(r * Math.cos(i * a), r * Math.sin(i * a));
        }
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }

    private lineTo(x: number, y: number): void {
        this.path.push({x, y});
        this.ctx.lineTo(x, y);
    }
}
