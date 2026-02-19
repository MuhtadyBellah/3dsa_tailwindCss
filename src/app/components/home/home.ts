import { SiteInfo } from './../../services/site-info';
import { Categories } from './../../services/categories';
import { Component, DestroyRef, inject, Input, input, OnDestroy, OnInit } from '@angular/core';
import { Posts } from '../../services/posts';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredPosts: post[] = [];
  lastestPosts: post[] = [];

  categories: category[] = [];
  filteredPosts: post[] = [];
  selectedCategory: string = '';

  siteInfo: siteInfo | null = null;
  constructor(
    private postService: Posts,
    private destroyRef: DestroyRef,
    private categoryService: Categories,
    private siteInfoService: SiteInfo,
  ) {}

  ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.featuredPosts = data.filter((post) => post.featured);
          this.lastestPosts = data.filter((post) => !post.featured).slice(0, 3);
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

    this.siteInfoService
      .getSiteInfo()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.siteInfo = data;
        },
        error: (err) => console.error(err),
      });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredPosts = this.lastestPosts.filter((post) =>
      post.category.toLowerCase().includes(category.toLowerCase()),
    );
  }
}
