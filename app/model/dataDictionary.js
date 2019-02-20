'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const DataDictionary = app.model.define('data_dictionary', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    dictionary_data: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  return DataDictionary;
};