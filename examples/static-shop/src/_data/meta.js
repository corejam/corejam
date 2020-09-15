const { GraphQLClient } = require("graphql-request");
const { settingsGQL, getLayoutConfigGQL } = require("@corejam/base");

const graphQLClient = new GraphQLClient(process.env.API_ENDPOINT);

module.exports = async function () {
  try {
    const meta = await graphQLClient.request(settingsGQL);
    const layout = await graphQLClient.request(getLayoutConfigGQL);
    return {
      meta: meta.config,
      layout: layout.config.layout,
    };
  } catch (e) {
    console.log(e);
  }
};
