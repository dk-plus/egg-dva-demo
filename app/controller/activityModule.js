const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ActivityModuleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.ActivityModule.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.ActivityModule.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const createAt = new Date().valueOf();
    const updateAt = new Date().valueOf();
    const module = await ctx.model.ActivityModule.create({ createAt, updateAt, ...rest });
    ctx.status = 201;
    ctx.body = module;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const module = await ctx.model.ActivityModule.findById(id);
    if (!module) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    const updateAt = new Date().valueOf();
    await module.update({ updateAt, ...rest });
    ctx.body = module;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const module = await ctx.model.ActivityModule.findById(id);
    if (!module) {
      ctx.status = 404;
      return;
    }

    await module.destroy();
    ctx.status = 200;
  }
}

module.exports = ActivityModuleController;