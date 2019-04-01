const express = require(`express`);
const bodyParser = require(`body-parser`);
const helmet = require(`helmet`);
const session = require(`express-session`);
const RedisStore = require(`connect-redis`)(session);
const passport = require(`./utils/passport`);

const { env } = require(`./config`);
const cors = require(`cors`);

const requestMiddleware = require(`./middlewares/request`);

const server = express();

server.use(cors());
server.use(bodyParser.json({ limit: `10mb` }));
server.use(bodyParser.urlencoded({ limit: `10mb`, extended: true }));
server.use(helmet());
server.use(
  session({
    secret: env.security.secret,
    store: new RedisStore(env.redis),
    saveUninitialized: false,
    resave: false
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(requestMiddleware);
server.use(`/api`, require(`./services`));

module.exports = server;
