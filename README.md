"# Incident Ticket System

## Overview

The Incident Ticket System is a comprehensive, full-stack application designed to streamline incident management and tracking. It provides organizations with a centralized platform to create, monitor, and resolve incidents in a structured and efficient manner.

## Architecture

This solution is architected as a modern, scalable application with a clear separation of concerns between frontend and backend components:

### Backend
- **Technology Stack**: ASP.NET Core (.NET 10.0)
- **Location**: `Backend/` directory
- **Responsibilities**: 
  - RESTful API endpoints for incident operations
  - Business logic and data validation
  - In-memory data storage with extensible service layer
  - Unit testing and quality assurance

### Frontend
- **Technology Stack**: Angular
- **Location**: `Frontend/` directory
- **Responsibilities**:
  - User interface for incident management
  - Client-side state management and service integration
  - Responsive design and user experience
  - End-to-end testing with Playwright

## Features

The Incident Ticket System provides the following core functionalities:

- **Create Incidents**: Users can submit new incidents with relevant details and context
- **List Incidents**: View all incidents with filtering and sorting capabilities
- **Resolve Incidents**: Update incident status and mark incidents as resolved
- **Track Status**: Monitor the progress of incidents from creation through resolution

## Project Structure

```
TicketIncidentSystem/
├── Backend/                    # ASP.NET Core API backend
│   ├── TicketSystemApi/       # Main API project
│   └── TicketSystem.Api.Tests/# Unit tests
├── Frontend/                   # Angular frontend application
├── docker-compose.yml         # Docker compose configuration
└── README.md                  # This file
```

## Getting Started

For detailed setup and deployment instructions, please refer to the respective documentation:
- [Backend README](Backend/README.md)
- [Frontend README](Frontend/README.md)
- [Docker Compose Setup](README_COMPOSE.md)

## Testing

### End-to-End Testing

The frontend includes comprehensive end-to-end tests using Playwright to validate user workflows and system functionality.

#### Prerequisites
- Docker and Docker Compose installed and running
- Node.js and npm installed

#### Running Playwright Tests

To execute the end-to-end test suite:

1. **Start the application stack**:
   ```bash
   docker-compose up
   ```
   This command will launch both the backend API and any required services.

2. **Run the Playwright test suite**:
   ```bash
   cd Frontend
   npm run e2e
   ```

The test results and detailed reports will be generated in the `playwright-report/` directory. After successful execution, you can review the test report by opening `Frontend/playwright-report/index.html` in your browser.

### Unit Testing

Backend unit tests are available in the `Backend/TicketSystem.Api.Tests/` directory. Refer to the [Backend README](Backend/README.md) for instructions on running backend unit tests." 
