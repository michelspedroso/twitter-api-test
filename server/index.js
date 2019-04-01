const _ = require(`lodash`);
const database = require(`./utils/database`);

const { env } = require(`./config`);

database.createPool({
  host: _.get(env, `database.host`, `database`),
  user: _.get(env, `database.user`, `root`),
  name: _.get(env, `database.name`, `twitter`),
  password: _.get(env, `database.password`, `root`)
});

const server = require(`./server`);

const port = _.get(env, `http.port`, 3000);

server.listen(port, () => {
  console.log(`twitter-api! Server running ${port}...`);
});
