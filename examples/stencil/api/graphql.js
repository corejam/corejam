require('dotenv').config();

const { CorejamServer } = require('@corejam/base/dist/Server');
const { send } = require('micro');
const cors = require('micro-cors')({ origin: 'http://localhost:3001' });

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 200, 'ok!');
  }
  const Server = await CorejamServer();
  return Server.createHandler({ path: '/api/graphql' })(req, res);
};

module.exports = cors(handler);
