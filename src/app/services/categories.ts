import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private http = inject(HttpClient);

  getCategories(): Observable<category[]> {
    return this.http.get<any>('/posts.json').pipe(map((response) => response.categories));
  }
}
