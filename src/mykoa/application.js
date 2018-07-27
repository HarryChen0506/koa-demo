// 自己的koa
const http = require('http')

module.exports = class Application {
  constructor() {
    this.name = 'myKoa';
    this.middleware = [];
    this.context = Object.create(null);
    this.request = Object.create(null);
    this.response = Object.create(null);
  }
  use(fn) {
    this.middleware.push(fn);
    return this
  }
  callback() {
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      // console.log('ctx', ctx)
      for (var i = 0; i < this.middleware.length; i++) {
        // console.log('index', i)
        this.middleware[i](ctx)
      }
    }
    return handleRequest
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    // 将serve的req和res绑定到context上
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    return context
  }
  listen(...args) {
    console.log('listen')
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}