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

  // config.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: 'localhost',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: 'gduf2015',
  //     // 数据库名
  //     database: 'activity_sys',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'activity_db',
    username: 'root',
    password: 'gduf2015',
    define: {
      underscored: true,      // 字段下划线命名
      freezeTableName: true,  // 禁用自动修改表名
      // timestamps: false,      // 不自动添加时间戳
    },
  };

  return config;
};
