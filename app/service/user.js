'use strict';

const { Service } = require('egg');

class User extends Service {
  // constructor() {}

  async checkUser(user, pwd) {
    const ctx = this.ctx;
    const query = { where:{ email: user } };
    const result = await ctx.model.User.findOne(query);

    if (!result) {
      return {
        code: 404,
        message: '账号不存在',
      };
    }

    if (result && result.password === pwd) {
      return {
        code: 200,
        message: 'success',
        data: {
          content: 'ok',
        },
      };
    }

    return {
      code: 404,
      message: '密码错误',
    };
  }
}

module.exports = User;
