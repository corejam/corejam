const { createTestClient } = require("apollo-server-testing");
import { getDataClient } from "@corejam/base";
import { DATACLIENTS } from "@corejam/base/src/PluginManager"
import { ServerResponse, IncomingMessage } from "http";
import { Socket } from "net";
import { CorejamServer, getServerContext } from "../__LINKEDPKGS__/base/src/Server";

/**
 * @credit KristianWEB https://github.com/KristianWEB/fakebooker-backend/blob/master/__tests__/util/testClient.js
 *
 * Test client with custom context argument that can be set per query or mutate call
 * @param ctxArg Default argument object to be passed
 */
export const testClient = async (
  ctxArg = { req: { headers: {} }, res: new ServerResponse(new IncomingMessage(new Socket())) }
) => {
  const baseCtxArg = ctxArg;
  //@ts-ignore
  let currentCtxArg = baseCtxArg;

  const context = () => getServerContext({ ...ctxArg });

  const { query, mutate, ...others } = createTestClient(await CorejamServer(context));
  const { models } = await context();

  // Wraps query and mutate function to set context arguments
  // eslint-disable-next-line no-shadow
  const wrap = (fn) => ({ ctxArg, ...args }) => {
    currentCtxArg = ctxArg != null ? ctxArg : baseCtxArg;
    return fn(args);
  };

  const res = { query: wrap(query), mutate: wrap(mutate), models, ...others };

  //Inject request function through query for mocking internal resolver http requests
  res.request = async (query) => {
    const { data } = await res.query({ query: query })
    return data;
  }
  getDataClient(DATACLIENTS.GRAPHQL, () => res)

  return res;
};