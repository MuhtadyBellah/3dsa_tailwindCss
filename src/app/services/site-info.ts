import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SiteInfo as SiteInfoInterface } from '../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class SiteInfo {
  private http = inject(HttpClient);

  getSiteInfo(): Observable<SiteInfoInterface> {
    return this.http.get<any>('/posts.json').pipe(map((response) => response.siteInfo));
  }
}
