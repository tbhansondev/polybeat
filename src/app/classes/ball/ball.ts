import { ICoordinates } from "src/app/interfaces/coordinates";
import { Shape } from "../shape/shape";

export class Ball extends Shape {
    private xBall: number;
    private yBall: number;
    private rBall: number;

    public animationPath: ICoordinates[];
    private coordIndex = -1;

    private dingaling: HTMLAudioElement;
    private dingalingFrames: number[];

    constructor(x: number, y: number, r: number, rBall: number, color: string, dingaling: HTMLAudioElement, ctx: CanvasRenderingContext2D) {
        super(x, y, r, color, ctx);
        this.rBall = rBall;
        this.dingaling = dingaling;
    }

    draw(): void {
        this.setTransform();
        this.updatePosition();
        this.playDingaling();
        this.ctx.beginPath();
        this.ctx.arc(this.xBall, this.yBall, this.rBall, 0, Math.PI * 2, true);
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
        this.xBall = this.animationPath[this.coordIndex].x;
        this.yBall = this.animationPath[this.coordIndex].y;
    }

    resetPosition(): void {
        this.coordIndex = 0;
        this.xBall = this.animationPath[0]?.x || 0;
        this.yBall = this.animationPath[0]?.y || 0;
    }

    playDingaling(): void {
        if (this.dingalingFrames.includes(this.coordIndex)) {
            this.dingaling.play();
        }
    }

    createAnimationPath(sidesPath: ICoordinates[], frames: number): void {
        this.animationPath = [];
        this.dingalingFrames = [];
        this.resetPosition();
        for(let side = 0; side < sidesPath.length; side++) {
            const s1 = side;
            const s2 = side === sidesPath.length - 1 ? 0 : side + 1;
            this.setCoords(sidesPath[s1], sidesPath[s2], sidesPath.length, frames);
        };
        // console.log(this.dingalingFrames);
    }

    private setCoords(p1: ICoordinates, p2: ICoordinates, sides: number, frames: number): void {
        const moves = frames / sides;
        const xunits = (p2.x - p1.x) / moves;
        const yunits = (p2.y - p1.y) / moves;
        const pathLen = this.animationPath.length;
        this.dingalingFrames.push(pathLen);
        for (let i = pathLen; i < pathLen + moves; i++){
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
