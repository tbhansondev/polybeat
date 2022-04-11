import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MathService {
    closestCommonMultipleToTarget(x: number, y: number, target: number): number {
        if (!this.inputsAreValid(x, y, target)) {
            return 0;
        }
        let m = 0;
        let i = 0;
        while(!m) {
            m = checkRemainders(target - i)
              ? target - i
              : checkRemainders(target + i)
              ? target + i
              : 0;
            i++;
        }
        return m;

        function checkRemainders(t: number): boolean {
            return !(t % x) && !(t % y);
        }
    }

    private inputsAreValid(...inputs: number[]): boolean {
        for (let i = 0; i < inputs.length - 1; i++) {
            const input = inputs[i];
            if (!input || typeof input !== 'number') {
                return false;
            }
        }
        return true;
    }
}
