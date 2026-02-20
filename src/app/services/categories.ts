import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<any>('/posts.json').pipe(map((response) => response.categories));
  }
}
