import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  constructor(private http: HttpClient) {}
  getPosts() {
    const result: any = this.http.get<post[]>('/posts.json');
    return result.posts;
  }
}
