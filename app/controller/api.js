'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async index() {

    const { ctx } = this;
    const { api } = ctx.params;

    if (!this._checkService(api)) {
      ctx.status = 404;
      ctx.body = 'service not found';
      return;
    }

    const data = await ctx.service[`${api}`].index();

    ctx.body = data;

  }

  // 检查服务是否存在
  _checkService(api) {
    return this.ctx.service[`${api}`];
  }

  async login() {
    const { ctx } = this;
    const { request: { body: { user, pwd } } } = ctx;

    const result = await ctx.service.user.checkUser(user, pwd);

    if (result.code === 200) {
      ctx.session.userInfo = {
        user,
        pwd
      };

      // ctx.redirect('/');
      ctx.body = {
        code: 200,
        msg: 'hello'
      }
    } else {
      ctx.body = {
        data: ctx.request.body,
        result: result
      }
    }
  }

  async logout() {
    const { ctx } = this;
    ctx.session.userInfo = null;

    ctx.redirect('/login');
  }
}

module.exports =  ApiController;