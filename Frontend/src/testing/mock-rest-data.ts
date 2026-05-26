import { Incident } from '../app/models/incident';

export const baseIncidentsUrl = 'http://localhost:5000/api/incidents';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Test Incident 1',
    status: 'open',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Test Incident 2',
    status: 'resolved',
    createdAt: new Date().toISOString(),
  },
];

export const mockResolvedIncident: Incident = {
  id: '123',
  title: 'Test Incident',
  status: 'resolved',
  createdAt: new Date().toISOString(),
};

export const mockConfig = {
  shouldFail: false,
};

export function generateMockId(): string {
  return Math.random().toString(36).substring(2, 11);
}
