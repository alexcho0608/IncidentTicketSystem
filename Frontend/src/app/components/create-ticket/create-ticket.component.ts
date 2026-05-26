import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css',
})
export class CreateTicketComponent {
  private readonly incidentService = inject(IncidentService);

  readonly created = output<Incident>();
  readonly cancelled = output<void>();

  title = '';
  submitting = false;
  error: string | null = null;

  submit(): void {
    const title = this.title.trim();
    if (!title) return;

    this.submitting = true;
    this.error = null;
    this.incidentService.create({ title }).subscribe({
      next: (incident) => {
        this.submitting = false;
        this.created.emit(incident);
      },
      error: () => {
        this.error = 'Failed to create ticket.';
        this.submitting = false;
      },
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
