import { TestBed } from '@angular/core/testing';
import { throwError, of } from 'rxjs';
import { IncidentService } from './incident.service';
import { RestService } from './rest.service';
import {
  mockIncidents,
  mockResolvedIncident,
} from '../../testing/mock-rest-data';
import { Incident } from '../models/incident';

describe('IncidentService', () => {
  let service: IncidentService;
  let mockRestService: jasmine.SpyObj<RestService>;

  beforeEach(() => {
    mockRestService = jasmine.createSpyObj<RestService>('RestService', [
      'get',
      'post',
      'put',
      'delete',
      'patch',
    ]);

    TestBed.configureTestingModule({
      providers: [
        IncidentService,
        { provide: RestService, useValue: mockRestService },
      ],
    });

    service = TestBed.inject(IncidentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list incidents', (done) => {
    mockRestService.get.and.returnValue(of(mockIncidents));

    service.list().subscribe((incidents) => {
      expect(incidents).toEqual(mockIncidents);
      expect(mockRestService.get).toHaveBeenCalled();
      done();
    });
  });



  it('should resolve an incident', (done) => {
    const incidentId = '123';
    mockRestService.post.and.returnValue(of(mockResolvedIncident));

    service.resolve(incidentId).subscribe((incident) => {
      expect(incident).toEqual(mockResolvedIncident);
      expect(mockRestService.post).toHaveBeenCalledWith(
        'api/incidents/123/resolve',
        {}
      );
      done();
    });
  });

  it('should handle request failures', (done) => {
    mockRestService.get.and.returnValue(
      throwError(() => new Error('Mock request failed'))
    );

    service.list().subscribe(
      () => {
        fail('should have failed');
      },
      (error) => {
        expect(error).toBeTruthy();
        done();
      }
    );
  });
});
