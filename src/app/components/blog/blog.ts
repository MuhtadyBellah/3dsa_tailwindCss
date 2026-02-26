import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Posts } from '../../services/posts';
import { Categories } from '../../services/categories';
import { Post, Category } from '../../interfaces/types';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  private postService = inject(Posts);
  private destroyRef = inject(DestroyRef);
  private categoryService = inject(Categories);
  private route = inject(ActivatedRoute);

  viewMode = signal<'grid' | 'list'>('grid');
  featuredPosts = signal<Post[]>([]);
  filteredPosts = signal<Post[]>([]);
  categories = signal<Category[]>([]);
  selectedCategory = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = signal<number>(6);
  searchQuery = signal<string>('');

  totalPages = computed(() => {
    const total = this.filteredPosts().length;
    return Math.ceil(total / this.pageSize()) || 1;
  });

  paginatedPosts = computed(() => {
    const posts = this.filteredPosts();
    const pageSize = this.pageSize();
    const currentPage = this.currentPage();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return posts.slice(startIndex, endIndex);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const pages: number[] = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  });

  constructor() {
    this.loadPosts();
    this.loadCategories();
  }

  private loadPosts(): void {
    this.postService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.featuredPosts.set(data);
          this.filteredPosts.set(data);
          this.currentPage.set(1);
          this.loadCategoryFromRoute();
          this.applyFilters();
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

  private loadCategoryFromRoute(): void {
    const category = this.route.snapshot.queryParamMap.get('category');
    if (category) {
      this.selectedCategory.set(decodeURIComponent(category));
    } else {
      this.selectedCategory.set('');
    }
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    this.applyFilters();
  }

  private applyFilters(): void {
    const category = this.selectedCategory().toLowerCase();
    const search = this.searchQuery().toLowerCase().trim();

    const filtered = this.featuredPosts().filter((post) => {
      const matchCategory =
        category === '' ||
        category === 'جميع المقالات' ||
        post.category.toLowerCase().includes(category);

      const matchSearch =
        search === '' ||
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search);

      return matchCategory && matchSearch;
    });

    this.filteredPosts.set(filtered);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  toggleViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }
}
