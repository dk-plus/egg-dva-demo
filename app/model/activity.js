'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: STRING(50),
      field: 'act_name'
    },
    title: STRING(50),
    description: STRING(50),
    endTime: {
      type: BIGINT,
      field: 'end_time'
    },
    rule: STRING(50),
    beginTime: {
      type: BIGINT,
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
    url: STRING(50),
    createAt: {
      type: BIGINT,
      field: 'created_at'
    },
    updateAt: {
      type: BIGINT,
      field: 'updated_at'
    },
  });

  return Activity;
};