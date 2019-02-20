'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ActivityModule = app.model.define('activity_module', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(50),
    type: INTEGER,
    activity_id: INTEGER,
    sort_num: INTEGER,
    module_data: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  return ActivityModule;
};