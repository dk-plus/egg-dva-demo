'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;

  const DataDictionary = app.model.define('data_dictionary', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    data: {
      type: STRING(100),
      field: 'dictionary_data'
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

  return DataDictionary;
};