'use strict';

const Service = require('egg').Service;

class QueryService extends Service {
  async index() {
    // const {} = this.ctx;
    console.log('queryservice', this.ctx);
    return {
      code: 20,
      msg: 'success'
    }
  }
}

module.exports = QueryService;