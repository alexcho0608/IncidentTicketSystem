using System.Text.Json;
using System.Text.Json.Serialization;
using TicketSystem.Api.Models;
using TicketSystem.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:4200", "http://localhost:8080")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddSingleton<IIncidentService, InMemoryIncidentService>();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
});

var app = builder.Build();

app.UseCors();

app.MapPost("/api/incidents", (CreateIncidentRequest request, IIncidentService incidents) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
        return Results.BadRequest(new { error = "Title is required." });

    var incident = incidents.Create(request.Title.Trim());
    return Results.Created($"/api/incidents/{incident.Id}", incident);
});

app.MapGet("/api/incidents", (IIncidentService incidents) =>
    Results.Ok(incidents.List()));

app.MapPost("/api/incidents/{id}/resolve", (string id, IIncidentService incidents) =>
{
    var incident = incidents.Resolve(id);
    return incident is null ? Results.NotFound() : Results.Ok(incident);
});

app.Run();
