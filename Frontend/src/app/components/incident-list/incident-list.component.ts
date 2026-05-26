import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../../models/incident';

@Component({
  selector: 'app-incident-list',
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.css',
})
export class IncidentListComponent {
  @Input() incidents: Incident[] = [];
  @Input() loading = false;
  @Input() resolvingId: string | null = null;
  @Input() showCreateForm = false;

  readonly refresh = output<void>();
  readonly resolve = output<Incident>();
}
