'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const ActivityModule = app.model.define('activity_module', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(50),
    type: INTEGER,
    activityId: {
      type: INTEGER,
      field: 'activity_id'
    },
    sort: {
      type: INTEGER,
      field: 'sort_num'
    },
    data: {
      type: STRING(100),
      field: 'module_data'
    },
    createdAt: {
      type: BIGINT,
      field: 'created_at'
    },
    updatedAt: {
      type: BIGINT,
      field: 'updated_at'
    },
  });

  return ActivityModule;
};