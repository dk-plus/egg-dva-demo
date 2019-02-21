const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ActivityController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { name, title, createTimeBegin, createTimeEnd, updateTimeBegin, updateTimeEnd, ...restQuery } = ctx.query;

    const dynamicQuery = {};
    if (createTimeBegin && createTimeEnd) {
      dynamicQuery.createAt = {
        $between: [createTimeBegin, createTimeEnd],
      }
    }
    if (updateTimeBegin && updateTimeEnd) {
      dynamicQuery.updateAt = {
        $between: [updateTimeBegin, updateTimeEnd],
      }
    }
    if (name) {
      dynamicQuery.name = {
        $like: `%${name}%`
      }
    }
    if (title) {
      dynamicQuery.title = {
        $like: `%${title}%`
      }
    }
    
    const query = { 
      limit: toInt(ctx.query.limit), 
      offset: toInt(ctx.query.offset), 
      where: { 
        ...dynamicQuery,
        ...restQuery 
      } 
    };
    const content = await ctx.model.Activity.findAll(query);
    ctx.body = ctx.outputSuccess({
      content,
      total: content.length
    });
  }

  async show() {
    const ctx = this.ctx;
    const content = await ctx.model.Activity.findById(toInt(ctx.params.id));
    ctx.body = ctx.outputSuccess(content);
  }

  async create() {
    const ctx = this.ctx;
    const { ...rest } = ctx.request.body;
    const createAt = new Date().valueOf();
    const updateAt = new Date().valueOf();
    const activity = await ctx.model.Activity.create({ createAt, updateAt, ...rest });
    ctx.status = 201;
    ctx.body = ctx.outputSuccess(activity);
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
    const updateAt = new Date().valueOf();
    await activity.update({ updateAt, ...rest });
    ctx.body = ctx.outputSuccess(activity);
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
    ctx.body = ctx.outputSuccess(activity);
  }
}

module.exports = ActivityController;