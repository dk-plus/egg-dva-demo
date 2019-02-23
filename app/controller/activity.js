const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ActivityController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { 
      pageSize, pageNo, name, title, sortName,
      createTimeBegin, createTimeEnd, updateTimeBegin, updateTimeEnd, 
      ...restQuery 
    } = ctx.query;

    // 动态查询
    const dynamicQuery = {
      ...ctx.parseLikeQuery(`name`, name),
      ...ctx.parseLikeQuery(`title`, title),
      ...ctx.parseBetweenQuery(`createAt`, createTimeBegin, createTimeEnd),
      ...ctx.parseBetweenQuery(`updateAt`, updateTimeBegin, updateTimeEnd),
    };
    
    // 查询参数
    const query = { 
      ...ctx.parsePageObject(pageSize, pageNo),
      where: { 
        ...dynamicQuery,
        ...restQuery 
      },
      order: sortName && [ctx.parseOrderQuery(sortName)],
    };

    const content = await ctx.model.Activity.findAndCountAll(query);
    ctx.body = ctx.outputSuccess({
      content: content.rows,
      total: content.count
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