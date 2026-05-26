using System.Linq;
using TicketSystem.Api.Models;
using TicketSystem.Api.Services;
using Xunit;

namespace TicketSystem.Api.Tests
{
    public class InMemoryIncidentServiceTests
    {
        [Fact]
        public void Create_ShouldReturnIncidentWithGivenTitleAndOpenStatus()
        {
            var svc = new InMemoryIncidentService();

            var incident = svc.Create("Database outage");

            Assert.False(string.IsNullOrWhiteSpace(incident.Id));
            Assert.Equal("Database outage", incident.Title);
            Assert.Equal(IncidentStatus.Open, incident.Status);
        }

        [Fact]
        public void List_ShouldReturnIncidentsInDescendingCreatedAtOrder()
        {
            var svc = new InMemoryIncidentService();

            var first = svc.Create("first");
            var second = svc.Create("second");

            var list = svc.List();

            Assert.Equal(2, list.Count);
            // second was created after first so it should come first in the list
            Assert.Equal(second.Id, list.First().Id);
            Assert.Equal(first.Id, list.Last().Id);
        }

        [Fact]
        public void Resolve_ShouldReturnNullWhenIdNotFound()
        {
            var svc = new InMemoryIncidentService();

            var result = svc.Resolve("non-existent-id");

            Assert.Null(result);
        }

        [Fact]
        public void Resolve_ShouldMarkIncidentAsResolved_AndBeIdempotent()
        {
            var svc = new InMemoryIncidentService();

            var incident = svc.Create("service degraded");

            var resolved = svc.Resolve(incident.Id);

            Assert.NotNull(resolved);
            Assert.Equal(IncidentStatus.Resolved, resolved!.Status);
            Assert.Equal(incident.Id, resolved.Id);

            // resolving again should return the same resolved incident
            var resolvedAgain = svc.Resolve(incident.Id);
            Assert.NotNull(resolvedAgain);
            Assert.Equal(IncidentStatus.Resolved, resolvedAgain!.Status);
            Assert.Equal(resolved.Id, resolvedAgain.Id);
        }
    }
}
