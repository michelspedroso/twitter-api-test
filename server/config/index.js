const nodeenvconfiguration = require(`node-env-configuration`);
const config = nodeenvconfiguration({
  defaults: require(`./../.env.json`),
  prefix: `APP`
});

const consts = require(`./consts`);
module.exports = {
  env: config,
  consts
};
