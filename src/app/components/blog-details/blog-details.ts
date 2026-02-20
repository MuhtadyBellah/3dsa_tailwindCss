import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Posts } from '../../services/posts';
import { Post } from '../../interfaces/types';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {
  post: Post | null = null;
  relatedPosts: Post[] = [];
  formattedContent: SafeHtml = '';
  tableOfContents: { id: string; title: string }[] = [];

  private postService = inject(Posts);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const currentSlug = params.get('slug');

      if (currentSlug) {
        this.loadPostData(currentSlug);
      }
    });
  }

  private loadPostData(slug: string): void {
    this.postService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (posts) => {
          this.post = posts.find((p: Post) => p.slug === slug) || null;

          if (this.post) {
            this.relatedPosts = posts
              .filter((p: Post) => p.category === this.post!.category && p.id !== this.post!.id)
              .slice(0, 3);

            this.formattedContent = this.parseContent(this.post.content);
          } else {
            console.warn(`Post with slug "${slug}" not found`);
          }
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 10);
        },
        error: (err) => console.error('Failed to load post', err),
      });
  }

  private parseContent(content: string): SafeHtml {
    if (!content) return '';

    this.tableOfContents = [];
    let sectionIndex = 0;

    const htmlContent = content
      .split('\n\n')
      .map((paragraph) => {
        if (paragraph.startsWith('## ')) {
          const headingText = paragraph.replace('## ', '');
          const id = `section-${sectionIndex++}`;
          this.tableOfContents.push({ id, title: headingText });
          return `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24">
                  <span class="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
                    <i class="fa-solid fa-camera text-orange-500"></i>
                  </span>
                  ${this.escapeHtml(headingText)}
                </h2>`;
        } else {
          return `<p class="text-neutral-300 leading-relaxed mb-6 text-lg">${this.escapeHtml(paragraph)}</p>`;
        }
      })
      .join('');

    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
