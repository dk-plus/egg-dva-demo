'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: STRING(50),
    password: STRING(50),
    username: STRING(50),
    createdAt: {
      type: BIGINT,
      field: 'created_at'
    },
    updatedAt: {
      type: BIGINT,
      field: 'updated_at'
    },
  });

  return User;
};