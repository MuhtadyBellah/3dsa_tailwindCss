import { Component, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Posts } from '../../services/posts';
import { Categories } from '../../services/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  viewMode: 'grid' | 'list' = 'grid';

  featuredPosts: post[] = [];
  filteredPosts: post[] = [];

  categories: category[] = [];
  selectedCategory: string = '';

  siteInfo: siteInfo | null = null;
  constructor(
    private postService: Posts,
    private destroyRef: DestroyRef,
    private categoryService: Categories,
  ) {}

  ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.featuredPosts = data;
          this.filteredPosts = this.featuredPosts;
        },
        error: (err) => console.error('Failed to load posts', err),
      });

    this.categoryService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => console.error('Failed to load categories', err),
      });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredPosts = this.featuredPosts.filter((post) =>
      post.category.toLowerCase().includes(category.toLowerCase()),
    );
  }

  toggleViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
}
