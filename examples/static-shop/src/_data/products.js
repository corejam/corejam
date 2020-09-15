const { GraphQLClient } = require("graphql-request");
const { allProductsGQL } = require("@corejam/base");
const { print } = require("graphql/language/printer");

const graphQLClient = new GraphQLClient(process.env.API_ENDPOINT);

module.exports = async function () {
  try {
    const data = await graphQLClient.request(print(allProductsGQL));
    return data.allProducts;
  } catch (e) {
    console.log(e);
  }
};
