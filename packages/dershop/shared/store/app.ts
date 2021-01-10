import { createStore } from "@stencil/store";
// import { GraphQLClient } from "graphql-request";

const { state } = createStore({
  api: null,
  client: null,
});

// onChange("api", (value) => {
//   state.client = new GraphQLClient(value, {
//     mode: "cors",
//   });
// });

export default state;
