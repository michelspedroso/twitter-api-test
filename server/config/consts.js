const consts = {};

/**
 * HTTP ERR
 */
consts.HTTP_SUCCESS = 200;
consts.HTTP_BAD_REQUEST = 400;
consts.HTTP_UNAUTHORIZED = 401;
consts.HTTP_FORBIDDEN = 403;
consts.HTTP_NOT_FOUND = 404;
consts.HTTP_CONFLICT = 409;
consts.HTTP_INTERNAL_SERVER_ERROR = 500;

/**
 * ERRNO
 */
consts.ERR_USER_NOT_AUTHENTICATED = 2003;
consts.ERR_USER_NOT_FOUND = 2004;
consts.ERR_USER_PASSWORD_INVALID = 2006;

module.exports = consts;
