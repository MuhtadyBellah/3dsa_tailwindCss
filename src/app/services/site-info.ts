import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SiteInfo {
  constructor(private http: HttpClient) {}
  getSiteInfo() {
    const result: any = this.http.get<siteInfo>('/posts.json');
    return result.siteInfo;
  }
}
