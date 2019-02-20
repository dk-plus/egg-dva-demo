'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(50),
    description: STRING(50),
    end_time: DATE,
    rule: STRING(50),
    begin_time: DATE,
    created_at: DATE,
    create_person: STRING(11),
    status: INTEGER,
    advertisement: STRING(50),
    tags: STRING(50),
    type: INTEGER,
  });

  return Activity;
};