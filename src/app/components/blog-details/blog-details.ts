import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Posts } from '../../services/posts';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-details',
  imports: [],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails implements OnInit {
  post: any = null;
  relatedPosts: post[] = [];

  formattedContent: string = '';
  tableOfContents: { id: string; title: string }[] = [];

  private postService = inject(Posts);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  constructor() {}
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
          this.post = posts.find((p: any) => p.slug === slug);

          if (this.post) {
            this.relatedPosts = posts
              .filter((p: any) => p.category === this.post.category && p.id !== this.post.id)
              .slice(0, 3);

            this.formattedContent = this.parseContent(this.post.content);
          }
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 10);
        },
        error: (err) => console.error('Failed to load post', err),
      });
  }

  private parseContent(content: string): string {
    if (!content) return '';

    this.tableOfContents = [];
    let sectionIndex = 0;

    return content
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
                  ${headingText}
                </h2>`;
        } else {
          return `<p class="text-neutral-300 leading-relaxed mb-6 text-lg">${paragraph}</p>`;
        }
      })
      .join('');
  }
}
