import { ICoordinates } from "src/app/interfaces/coordinates";
import { Shape } from "../shape/shape";

export class Polygon extends Shape {
    path: ICoordinates[];

    constructor(x: number, y: number, r: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, r, color, ctx);
    }

    draw(): void {
        this.setTransform();
        this.ctx.beginPath();
        // this.ctx.moveTo(this.r, 0);
        this.path.forEach((coords) => {
            this.ctx.lineTo(coords.x, coords.y);
        });
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }

    createPath(sides: number): void {
        const a = 2 * Math.PI / sides;
        this.path = [];
        for (let i = 1; i <= sides; i++) {
            this.path.push({
                x: this.r * Math.cos(i * a), 
                y: this.r * Math.sin(i * a),
            });
        }
        this.path.unshift(this.path[this.path.length - 1]);
        this.path.splice(this.path.length - 1, 1);
        console.log(this.path);
    }
}
