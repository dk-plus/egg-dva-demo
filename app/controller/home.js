'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { userInfo } = ctx;

    if (!userInfo) {
      ctx.redirect('/login');
      return;
    }
    
    await ctx.render('home.tpl', {
      title: '首页',
      user: 'dkplus'
    });
  }

  async login() {
    const { ctx } = this;
    await ctx.render('home.tpl', {
      title: '登录',
    });
  }
}

module.exports = HomeController;
