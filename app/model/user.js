'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: STRING(50),
    password: STRING(50),
    username: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};