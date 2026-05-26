using System.Collections.Concurrent;
using TicketSystem.Api.Models;

namespace TicketSystem.Api.Services;

public sealed class InMemoryIncidentService : IIncidentService
{
    private readonly ConcurrentDictionary<string, Incident> _incidents = new();

    public Incident Create(string title)
    {
        var incident = new Incident(
            Id: Guid.NewGuid().ToString(),
            Title: title,
            Status: IncidentStatus.Open,
            CreatedAt: DateTime.UtcNow);

        _incidents[incident.Id] = incident;
        return incident;
    }

    public IReadOnlyList<Incident> List() =>
        _incidents.Values
            .OrderByDescending(i => i.CreatedAt)
            .ToList();

    public Incident? Resolve(string id)
    {
        if (!_incidents.TryGetValue(id, out var incident))
            return null;

        if (incident.Status == IncidentStatus.Resolved)
            return incident;

        var resolved = incident with { Status = IncidentStatus.Resolved };
        _incidents[id] = resolved;
        return resolved;
    }
}
