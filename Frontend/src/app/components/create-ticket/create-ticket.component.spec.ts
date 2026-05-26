import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CreateTicketComponent } from './create-ticket.component';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;
  const mockIncident: Incident = {
    id: '1',
    title: 'Test issue',
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    mockIncidentService = jasmine.createSpyObj('IncidentService', ['create']);

    await TestBed.configureTestingModule({
      imports: [CreateTicketComponent, FormsModule],
      providers: [{ provide: IncidentService, useValue: mockIncidentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not call create when the title is empty', () => {
    component.title = '   ';

    component.submit();

    expect(mockIncidentService.create).not.toHaveBeenCalled();
    expect(component.submitting).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should call create and emit created event when valid title is submitted', (done) => {
    component.title = 'New incident';
    mockIncidentService.create.and.returnValue(of(mockIncident));

    component.created.subscribe((incident) => {
      expect(incident).toBe(mockIncident);
      done();
    });

    component.submit();

    expect(mockIncidentService.create).toHaveBeenCalledWith({ title: 'New incident' });
    expect(component.submitting).toBe(false);
    expect(component.error).toBeNull();
  });
});
