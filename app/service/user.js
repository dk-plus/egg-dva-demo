const { Service } = require('egg');

class User extends Service {
  // constructor() {}

  async checkUser(user, pwd) {
    if (user === 'qwerty' && pwd === '123456') {
      return {
        code: 200,
        message: 'success',
        data: {
          content: 'ok'
        }
      }
    } else {
      return {
        code: 404,
        message: 'failed'
      }
    }
  }
}

module.exports = User;