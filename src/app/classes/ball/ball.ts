import { ICoordinates } from "src/app/interfaces/coordinates";
import { Shape } from "../shape/shape";

export class Ball extends Shape {
    private rBall: number;
    private initialX: number;
    private initialY: number;
    public animationPath: ICoordinates[];

    private points = 480 // find a multiple common to the two numbers of sides;
    private coordIndex = -1;

    constructor(x: number, y: number, r: number, rBall: number, color: string, ctx: CanvasRenderingContext2D) {
        super(x, y, r, color, ctx);
        this.rBall = rBall;
        this.initialX = x;
        this.initialY = y;
    }

    draw(): void {
        this.setTransform();
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
            ? this.animationPath.length - 1
            : this.coordIndex + 1 === this.animationPath.length
            ? 0
            : this.coordIndex + 1;
        this.x = this.animationPath[this.coordIndex].x;
        this.y = this.animationPath[this.coordIndex].y;
    }

    resetPosition(): void {
        this.coordIndex = 0;
        this.x = this.initialX;
        this.y = this.initialY;
    }

    createAnimationPath(sidesPath: ICoordinates[], speed: number): void {
        this.animationPath = [];
        this.resetPosition();
        for(let side = 0; side < sidesPath.length; side++) {
            const s1 = side;
            const s2 = side === sidesPath.length - 1 ? 0 : side + 1;
            this.setCoords(sidesPath[s1], sidesPath[s2], sidesPath.length);
        };
    }

    private setCoords(start: ICoordinates, end: ICoordinates, sides: number): void {
        const p1 = start;
        const p2 = end;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt((dx * dx) + (dy * dy));
        const moves = this.points / sides;
        console.log('sides', sides, 'moves', moves, 'total moves', moves * sides);
        const xunits = (p2.x - p1.x) / moves;
        const yunits = (p2.y - p1.y) / moves;
        const pathLen = this.animationPath.length;
        for (let i = pathLen; i <= pathLen + moves; i++){
            const previousPoint = this.animationPath[i - 1] || null;
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
            this.animationPath.push({x,y});
        }
    }
}
