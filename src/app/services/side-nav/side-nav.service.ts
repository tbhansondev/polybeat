import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  isOpen: boolean;

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  toggle(): boolean {
    this.isOpen = !this.isOpen;
    return this.isOpen;
  }
}
