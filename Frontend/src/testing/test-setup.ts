import { TestBed } from '@angular/core/testing';
import { RestService } from '../app/services/rest.service';
import { MockRestService } from './mock-rest.service';

export function setupTestingModule(components: any[], declarations: any[] = []) {
  TestBed.configureTestingModule({
    imports: [components],
    declarations,
    providers: [
      { provide: RestService, useClass: MockRestService },
    ],
  });
}

export function getMockRestService(): MockRestService {
  return TestBed.inject(RestService) as MockRestService;
}
