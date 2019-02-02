'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    ctx.userInfo = ctx.session.userInfo || '';
    await next();
  };
};
