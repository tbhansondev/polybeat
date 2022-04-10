import { ICoordinates } from "src/app/interfaces/coordinates";
import { Shape } from "../shape/shape";

export class Ball extends Shape {
    private rBall: number;
    private initialX: number;
    private initialY: number;
    public path: ICoordinates[];

    private points = 480 // find a multiple common to the two numbers of sides;
    private coordIndex = -1;

    constructor(x: number, y: number, r: number, rBall: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, r, color, ctx);
        this.rBall = rBall;
        this.initialX = x;
        this.initialY = y;
    }

    draw(): void {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(this.initialX, this.initialY);
        this.updatePosition();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.rBall, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    updatePosition(): void {
        this.coordIndex =
          this.coordIndex < 0
            ? this.path.length - 1
            : this.coordIndex + 1 === this.path.length
            ? 0
            : this.coordIndex + 1;
        // console.log('coordindex', this.coordIndex);
        // console.log(this.coordIndex);
        // console.log(this.path.length);
        // console.log(this.x, this.y);
        this.x = this.path[this.coordIndex].x;
        this.y = this.path[this.coordIndex].y;
        // console.log(this.x, this.y);
    }

    resetPosition(): void {
        this.coordIndex = 0;
        this.x = this.initialX;
        this.y = this.initialY;
    }

    createPath(path: ICoordinates[], sides: number): void {
        this.path = [];
        this.resetPosition();
        for(let side = 0; side < path.length; side++) {
            const s1 = side;
            const s2 = side === path.length - 1 ? 0 : side + 1;
            // console.log('s1', s1, path[s1], 's2', s2, path[s2]);
            this.setCoords(path[s1], path[s2], sides);
        };
        //console.log('path', path);
        // console.log('this.path', this.path);
    }

    setCoords(start: ICoordinates, end: ICoordinates, sides: number): void {
        const p1 = start;
        const p2 = end;
        // console.log('p1', p1, 'p2', p2);
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt((dx * dx) + (dy * dy));
        const moves = this.points / sides;
        console.log('sides', sides, 'moves', moves, 'moves per side', moves / sides);
        const xunits = (p2.x - p1.x) / moves;
        const yunits = (p2.y - p1.y) / moves;
        // this.path.push(start);
        const pathLen = this.path.length;
        for (let i = pathLen; i <= pathLen + moves; i++){
            const previousPoint = this.path[i - 1] || null;
            let x: number;
            let y: number;
            if (previousPoint) {
                x = previousPoint.x += xunits;
                y = previousPoint.y += yunits
            }
            else {
                x = p1.x;
                y = p1.y;
            }
            this.path.push({x,y});
        }
    }
}
