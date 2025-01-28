const application = require("./application");
const eventMediator = require("../eventMediator");
const { mediatorToPubSub } = require("../eventMediatorToPubSub");
const { pubSub } = require("../redisPubSub");

const topics = {
  TENANT_ONBOARDING_STATUS_CHANGED: "TENANT_ONBOARDING_STATUS_CHANGED",
};

const resolvers = {
  Mutation: {
    createIncident: async (parent, args, context) =>
      await application.createIncident(
        args.name,
        args.description,
        args.date,
        args.location
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

eventMediator.subscribe('incidentCreated', mediatorToPubSub(topics.TENANT_ONBOARDING_STATUS_CHANGED))


