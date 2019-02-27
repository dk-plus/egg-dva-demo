'use strict';

module.exports = {
  require(name, type) {
    let result = '';
    switch (type) {
      case 'css':
        result = `<link rel="stylesheet" href="/public/${name}.css" />`
        break;
      case 'js':
        result = `<script src="/public/${name}.js"></script>`
        break;
      default:
        break;
    }
    return this.safe(result);
  },
};
