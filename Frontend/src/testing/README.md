# Testing Guide

This directory contains utilities and mocks for testing the Angular application.

## Structure

- `mock-rest.service.ts` - Mock implementation of RestService for testing
- `test-setup.ts` - Utility functions to configure TestBed with mocks
- `incident.service.spec.ts` - Example test for IncidentService

## Using MockRestService

The `MockRestService` provides a way to mock HTTP requests without making real network calls.

### Basic Setup

```typescript
import { TestBed } from '@angular/core/testing';
import { RestService } from '../app/services/rest.service';
import { MockRestService } from './mock-rest.service';

describe('MyService', () => {
  let mockRest: MockRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyService,
        { provide: RestService, useClass: MockRestService },
      ],
    });

    mockRest = TestBed.inject(RestService) as MockRestService;
  });

  it('should work', () => {
    // Your test here
  });
});
```

### Setting Mock Data

```typescript
// Set up mock response data
const mockData = { id: '1', title: 'Test' };
mockRest.setMockData('http://api.example.com/endpoint', mockData);

// Make a request
service.getItem().subscribe(result => {
  expect(result).toEqual(mockData);
});
```

### Testing Failures

```typescript
// Configure mock to fail
mockRest.setFailure(true);

// Make a request
service.getItem().subscribe(
  () => fail('should have failed'),
  error => expect(error).toBeTruthy()
);

// Reset
mockRest.setFailure(false);
```

### Cleanup

```typescript
afterEach(() => {
  mockRest.clearMockData();
});
```

## Mock Service Methods

- `get<T>(url)` - Mock GET request
- `post<T>(url, body)` - Mock POST request
- `put<T>(url, body)` - Mock PUT request
- `delete<T>(url)` - Mock DELETE request
- `patch<T>(url, body)` - Mock PATCH request

### Test Utilities

- `setMockData(url, data)` - Set response for a URL
- `getMockData(url)` - Get the mock data for a URL
- `clearMockData()` - Clear all mock data
- `setFailure(shouldFail)` - Enable/disable request failures

## Running Tests

```bash
# Run all tests
ng test

# Run tests in headless mode
ng test --watch=false

# Run specific test file
ng test --include='**/incident.service.spec.ts'
```

## Best Practices

1. **Always clear mock data** after each test to avoid state bleeding
2. **Use realistic mock data** that matches your actual API responses
3. **Test both success and failure scenarios**
4. **Mock only HTTP calls**, let other services work normally
5. **Keep mocks close to real behavior** for better coverage
