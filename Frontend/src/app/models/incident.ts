export type IncidentStatus = 'open' | 'resolved';

export interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
  createdAt: string;
}

export interface CreateIncidentRequest {
  title: string;
}
