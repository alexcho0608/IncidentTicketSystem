import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateIncidentRequest, Incident } from '../models/incident';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private readonly rest = inject(RestService);
  private readonly apiIncidentsEndpoint = 'api/incidents';

  list(): Observable<Incident[]> {
    return this.rest.get<Incident[]>(this.apiIncidentsEndpoint);
  }

  create(request: CreateIncidentRequest): Observable<Incident> {
    return this.rest.post<Incident>(this.apiIncidentsEndpoint, request);
  }

  resolve(id: string): Observable<Incident> {
    return this.rest.post<Incident>(`${this.apiIncidentsEndpoint}/${id}/resolve`, {});
  }
}
