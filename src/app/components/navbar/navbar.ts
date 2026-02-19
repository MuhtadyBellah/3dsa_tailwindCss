import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  private scrollListener = this.onScroll.bind(this);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.scrollListener);
    }

    effect(
      () => {
        return () => {
          if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.scrollListener);
          }
        };
      },
      { allowSignalWrites: true }
    );
  }

  private onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
