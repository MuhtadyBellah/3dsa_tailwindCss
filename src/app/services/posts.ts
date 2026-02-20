import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[]> {
    return this.http.get<any>('/posts.json').pipe(map((response) => response.posts));
  }
}
