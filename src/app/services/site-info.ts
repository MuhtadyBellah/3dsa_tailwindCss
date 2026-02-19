import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteInfo {
  constructor(private http: HttpClient) {}
  getSiteInfo(): Observable<siteInfo> {
    return this.http.get<any>('/posts.json').pipe(map((response) => response.siteInfo));
  }
}
