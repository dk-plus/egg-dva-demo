'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

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
      type: DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at'
    },
  });

  return ActivityModule;
};