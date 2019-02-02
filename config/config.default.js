'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546829243831_2196';

  // add your config here
  config.middleware = ['checkLogin'];

  config.security = {
    'csrf': false,
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.session = {
    key: 'userInfo',
    maxAge: 10 * 1000,
    httpOnly: true,
    encrypt: true,
  };

  return config;
};
