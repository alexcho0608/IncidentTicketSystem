import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  baseIncidentsUrl,
  generateMockId,
  mockConfig,
  mockIncidents,
  mockResolvedIncident,
} from './mock-rest-data';

@Injectable()
export class MockRestService {
  get<T>(url: string): Observable<T> {
    if (mockConfig.shouldFail) {
      return throwError(() => new Error('Mock request failed'));
    }

    if (url === baseIncidentsUrl) {
      return of(mockIncidents as unknown as T);
    }

    return of([] as T);
  }

  post<T>(url: string, body: any): Observable<T> {
    if (mockConfig.shouldFail) {
      return throwError(() => new Error('Mock request failed'));
    }

    if (url === baseIncidentsUrl) {
      const data = { ...body, id: generateMockId() };
      return of(data as T);
    }

    if (url.endsWith('/resolve')) {
      return of(mockResolvedIncident as unknown as T);
    }

    return of(body as T);
  }

  put<T>(url: string, body: any): Observable<T> {
    if (mockConfig.shouldFail) {
      return throwError(() => new Error('Mock request failed'));
    }

    return of(body as T);
  }

  delete<T>(url: string): Observable<T> {
    if (mockConfig.shouldFail) {
      return throwError(() => new Error('Mock request failed'));
    }

    return of(null as T);
  }

  patch<T>(url: string, body: any): Observable<T> {
    if (mockConfig.shouldFail) {
      return throwError(() => new Error('Mock request failed'));
    }

    return of(body as T);
  }
}
