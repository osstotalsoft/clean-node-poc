const { commands, queries } = require("./application2");
const mediator = require("../mediator");
const { pubSub } = require("../redisPubSub");

const topics = {
  TENANT_ONBOARDING_STATUS_CHANGED: "TENANT_ONBOARDING_STATUS_CHANGED",
};

const resolvers = {
  Query: {
    getIncident: async (parent, args, context) =>
      await mediator.send(queries.getIncident(args.id)),
  },
  Mutation: {
    createIncident: async (parent, args, context) =>
      await mediator.send(
        commands.createIncident(
          args.name,
          args.description,
          args.date,
          args.location
        )
      ),
  },
  Subscription: {
    incidentCreated: {
      resolve: async (msg, _args, _context, _info) => {
        return msg?.payload;
      },
      subscribe: (_parent, _args) =>
        pubSub.asyncIterator(topics.TENANT_ONBOARDING_STATUS_CHANGED),
    },
  },
};

eventMediator.subscribe(
  "incidentCreated",
  mediatorToPubSub(topics.TENANT_ONBOARDING_STATUS_CHANGED)
);

module.exports = { resolvers };
