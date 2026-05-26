using System.Text.Json.Serialization;

namespace TicketSystem.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum IncidentStatus
{
    Open,
    Resolved
}
