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
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    encrypt: true,
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'activity_db',
    username: 'root',
    password: 'abc123',
    define: {
      underscored: true,      // 字段下划线命名
      freezeTableName: true,  // 禁用自动修改表名
      timestamps: false,      // 不自动添加时间戳
    },
  };

  return config;
};
