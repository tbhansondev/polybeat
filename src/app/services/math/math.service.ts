import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MathService {
    lowestCommonMultiple(x: number, y: number): number {
        if ((typeof x !== 'number') || (typeof y !== 'number')) {
            return 0;
        }
        return (!x || !y) ? 0 : Math.abs((x * y) / this.greatestCommonDivisor(x, y));
    }

    greatestCommonDivisor(x: number, y: number): number {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            const t = y;
            y = x % y;
            x = t;
        }
        return x;
    }
}
