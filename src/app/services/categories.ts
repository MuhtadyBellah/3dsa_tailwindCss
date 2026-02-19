import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  constructor(private http: HttpClient) {}
  getCategories() {
    const result: any = this.http.get<category[]>('/posts.json');
    return result.categories;
  }
}
