import { Component, signal, DestroyRef, inject } from '@angular/core';
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

  private destroyRef = inject(DestroyRef);

  constructor() {
    if (typeof window !== 'undefined') {
      const scrollListener = () => {
        this.isScrolled.set(window.scrollY > 50);
      };

      window.addEventListener('scroll', scrollListener);
      this.destroyRef.onDestroy(() => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', scrollListener);
        }
      });
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
