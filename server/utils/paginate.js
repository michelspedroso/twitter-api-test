const querystring = require(`querystring`);

const paginate = function(total, redirects, query) {
  const pagination = {
    rows: redirects,
    isLastPage: false,
    isFirstPage: false,
    limit: query.limit,
    offset: query.offset,
    total,
    links: {}
  };

  if (query.offset + query.limit >= total) {
    pagination.isLastPage = true;
  } else {
    query.offset = pagination.offset + pagination.limit;
    pagination.links.next = querystring.stringify(query);
  }

  if (pagination.offset === 0) {
    pagination.isFirstPage = true;
  } else {
    query.offset -= pagination.limit;
    pagination.links.prev = querystring.stringify(query);
  }

  return pagination;
};

module.exports = paginate;
