'use strict';

// had enabled by egg
// exports.static = true;

exports.nunjucks = {
  enabled: true,
  package: 'egg-view-nunjucks',
};

// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql',
// };

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};