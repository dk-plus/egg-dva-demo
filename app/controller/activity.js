const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ActivityController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Activity.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Activity.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const activity = await ctx.model.Activity.create({ ...rest });
    ctx.status = 201;
    ctx.body = activity;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const activity = await ctx.model.Activity.findById(id);
    if (!activity) {
      ctx.status = 404;
      return;
    }

    const { ...rest } = ctx.request.body;
    await activity.update({ ...rest });
    ctx.body = activity;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const activity = await ctx.model.Activity.findById(id);
    if (!activity) {
      ctx.status = 404;
      return;
    }

    await activity.destroy();
    ctx.status = 200;
  }
}

module.exports = ActivityController;