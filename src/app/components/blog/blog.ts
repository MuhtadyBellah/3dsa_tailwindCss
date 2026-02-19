import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  viewMode: 'grid' | 'list' = 'grid';

  toggleViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
}
