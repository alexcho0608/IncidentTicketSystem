namespace TicketSystem.Api.Models;

public sealed record Incident(
    string Id,
    string Title,
    IncidentStatus Status,
    DateTime CreatedAt);
