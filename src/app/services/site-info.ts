import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteInfo {
  private http = inject(HttpClient);

  getSiteInfo(): Observable<siteInfo> {
    return this.http.get<any>('/posts.json').pipe(map((response) => response.siteInfo));
  }
}
