import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

    frameCount = 0;
    fps: number = 144;
    currentFps: number;
    elapsedSinceStart: number;

    private fpsInterval: number;
    private startTime: number;
    private now: number;
    private then: number;
    private elapsed: number;
    private raf: number;

    start(fn: () => void): void {
        this.fpsInterval = 1000 / this.fps;
        this.then = window.performance.now();
        this.startTime = this.then;
        this.animate(fn);
    }

    stop(): void {
        window.cancelAnimationFrame(this.raf);
    }

    private animate(fn: () => void): void {
        this.raf = requestAnimationFrame(this.animate.bind(this, fn));
        this.now = window.performance.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            fn();
            this.elapsedSinceStart = this.now - this.startTime;
            this.currentFps = Math.round(1000 / (this.elapsedSinceStart / ++this.frameCount) * 100) / 100;
        }
    }
}
