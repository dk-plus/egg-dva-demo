'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: STRING(50),
      field: 'act_name'
    },
    title: STRING(50),
    description: STRING(50),
    endTime: {
      type: DATE,
      field: 'end_time'
    },
    rule: STRING(50),
    beginTime: {
      type: DATE,
      field: 'begin_time'
    },
    createPerson: {
      type: STRING(11),
      field: 'create_person'
    },
    status: INTEGER,
    advertisement: STRING(50),
    tags: STRING(50),
    type: INTEGER,
    createAt: {
      type: DATE,
      field: 'created_at'
    },
    updateAt: {
      type: DATE,
      field: 'updated_at'
    },
  });

  return Activity;
};