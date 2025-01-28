const domain =  require('./domain')
const repository = require('./repository')
const eventMediator = require('../eventMediator')


async function createIncident(name, description, date, location) {
    var [incident, ...events] = domain.createIncident(name, description, date, location)
    incident = await repository.createIncident(incident)
    events.forEach(eventMediator.publish)
    return incident;
}

async function closeIncident(id) {
    var incident = await repository.loadById(id)
    var [incident, ...events] = domain.closeIncident(incident)
    await repository.updateIncident(incident)
    events.forEach(eventMediator.publish)
    return incident;
}

module.exports = { createIncident, closeIncident }