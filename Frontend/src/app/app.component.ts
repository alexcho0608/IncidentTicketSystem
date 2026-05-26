import { Component, OnInit, inject } from '@angular/core';
import { IncidentService } from './services/incident.service';
import { Incident } from './models/incident';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';

@Component({
  selector: 'app-root',
  imports: [CreateTicketComponent, IncidentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly incidentService = inject(IncidentService);

  incidents: Incident[] = [];
  showCreateForm = false;
  loading = false;
  resolvingId: string | null = null;
  error: string | null = null;

  ngOnInit(): void {
    this.loadIncidents();
  }

  openCreateForm(): void {
    this.showCreateForm = true;
    this.error = null;
  }

  onTicketCreated(incident: Incident): void {
    this.incidents = [incident, ...this.incidents];
    this.showCreateForm = false;
  }

  onCreateCancelled(): void {
    this.showCreateForm = false;
  }

  loadIncidents(): void {
    this.loading = true;
    this.error = null;
    this.incidentService.list().subscribe({
      next: (incidents) => {
        this.incidents = incidents;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load incidents. Is the API running?';
        this.loading = false;
      },
    });
  }

  resolveIncident(incident: Incident): void {
    if (incident.status === 'resolved') return;

    this.resolvingId = incident.id;
    this.error = null;
    this.incidentService.resolve(incident.id).subscribe({
      next: (updated) => {
        this.incidents = this.incidents.map((i) =>
          i.id === updated.id ? updated : i
        );
        this.resolvingId = null;
      },
      error: () => {
        this.error = 'Failed to resolve incident.';
        this.resolvingId = null;
      },
    });
  }
}
