import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

    frameCount = 0;
    fps: number = 60;
    fpsInterval: number;
    currentFps: number;
    startTime: number;
    now: number;
    then: number;
    elapsed: number;
    elapsedSinceStart: number;
    raf: number;

    start(fn: () => void): void {
        this.fpsInterval = 1000 / this.fps;
        this.then = window.performance.now();
        this.startTime = this.then;
        this.animate(fn);
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

    stop(): void {
        window.cancelAnimationFrame(this.raf);
    }

}
