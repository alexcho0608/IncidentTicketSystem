import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RestService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/+$/, '');

  public constructor() {}

  private resolveUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.baseUrl}/${url.replace(/^\/+/, '')}`;
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.resolveUrl(url));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.resolveUrl(url), body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.resolveUrl(url), body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.resolveUrl(url));
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(this.resolveUrl(url), body);
  }
}
