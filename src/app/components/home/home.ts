import { SiteInfo } from './../../services/site-info';
import { Categories } from './../../services/categories';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Posts } from '../../services/posts';
import { Post, Category, SiteInfo as SiteInfoInterface } from '../../interfaces/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private postService = inject(Posts);
  private destroyRef = inject(DestroyRef);
  private categoryService = inject(Categories);
  private siteInfoService = inject(SiteInfo);

  featuredPosts = signal<Post[]>([]);
  lastestPosts = signal<Post[]>([]);
  categories = signal<Category[]>([]);
  siteInfo = signal<SiteInfoInterface | null>(null);

  constructor() {
    this.loadPosts();
    this.loadCategories();
    this.loadSiteInfo();
  }

  private loadPosts(): void {
    this.postService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.featuredPosts.set(data.filter((post) => post.featured));
          this.lastestPosts.set(data.filter((post) => !post.featured).slice(0, 3));
        },
        error: (err) => console.error('Failed to load posts', err),
      });
  }

  private loadCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.categories.set(data);
        },
        error: (err) => console.error('Failed to load categories', err),
      });
  }

  private loadSiteInfo(): void {
    this.siteInfoService
      .getSiteInfo()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.siteInfo.set(data);
        },
        error: (err) => console.error('Failed to load site info', err),
      });
  }
}
