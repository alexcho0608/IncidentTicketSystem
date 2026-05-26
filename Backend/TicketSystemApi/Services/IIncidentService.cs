using TicketSystem.Api.Models;

namespace TicketSystem.Api.Services;

public interface IIncidentService
{
    Incident Create(string title);
    IReadOnlyList<Incident> List();
    Incident? Resolve(string id);
}
