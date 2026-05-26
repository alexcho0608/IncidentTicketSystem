import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IncidentListComponent } from './incident-list.component';
import { Incident } from '../../models/incident';

describe('IncidentListComponent', () => {
  let component: IncidentListComponent;
  let fixture: ComponentFixture<IncidentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentListComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with default input values', () => {
    expect(component.incidents).toEqual([]);
    expect(component.loading).toBe(false);
    expect(component.resolvingId).toBeNull();
    expect(component.showCreateForm).toBe(false);
  });

  it('should emit refresh and resolve events', () => {
    const refreshSpy = jasmine.createSpy('refreshSpy');
    const resolveSpy = jasmine.createSpy('resolveSpy');
    const incident: Incident = {
      id: '1',
      title: 'Issue',
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    component.refresh.subscribe(refreshSpy);
    component.resolve.subscribe(resolveSpy);

    component.refresh.emit();
    component.resolve.emit(incident);

    expect(refreshSpy).toHaveBeenCalled();
    expect(resolveSpy).toHaveBeenCalledWith(incident);
  });
});
