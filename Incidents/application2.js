const domain = require("./domain");
const repository = require("./repository");
const mediator = require("../mediator");

const commands = {
  createIncident: (name, description, date, location) => ({
    type: "createIncident",
    payload: { name, description, date, location },
  }),
  closeIncident: (id) => ({ type: "closeIncident", payload: { id } }),
};

const queries = {
    getIncident: (id) => ({ type: "getIncident", payload: { id } }),
}

async function getIncident({ payload: request }) {
    return await repository.loadById(request.id);
}

async function createIncident({ payload: request }) {
  var [incident, ...events] = domain.createIncident(
    request.name,
    request.description,
    request.date,
    request.location
  );
  incident = await repository.createIncident(incident);
  events.forEach(mediator.publish);
  return incident;
}

async function closeIncident({ payload: request }) {
  var incident = await repository.loadById(request.id);
  var [incident, ...events] = domain.closeIncident(incident);
  await repository.updateIncident(incident);
  events.forEach(mediator.publish);
  return incident;
}

mediator.registerRequestHandler("createIncident", createIncident);
mediator.registerRequestHandler("closeIncident", closeIncident);
mediator.registerRequestHandler("getIncident", getIncident);

module.exports = { commands, queries };
