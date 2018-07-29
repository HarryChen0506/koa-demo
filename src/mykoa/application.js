// 自己的koa
const http = require('http')
const request = {
  get url() {
    return this.req.url
  }
}
const response = {
  get body() {
    return this._body
  },
  set body(val) {
    return this._body = val
  }
}
const context = {
  get url() {
    return this.request.url
  },
  get body() {
    return this.response.body
  },
  set body(val) {
    return this.response.body = val
  }
}
const compose = function (middlewares = []) {
  return function (ctx) {
    return dispatch(0)
    function dispatch(index) {
      let fn = middlewares[index]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(ctx, function next() {
        return dispatch(index + 1)
      }))
    }
  }  
}

module.exports = class Application {
  constructor() {
    this.name = 'myKoa';
    this.middleware = [];    
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
  }
  use(fn) {
    this.middleware.push(fn);
    return this
  }
  callback() {
    const handleRequest = async (req, res) => {
      const ctx = this.createContext(req, res)
      // console.log('ctx', ctx)
      // for (var i = 0; i < this.middleware.length; i++) {
      //   // console.log('index', i)
      //   await this.middleware[i](ctx)
      // }
      const fn = compose(this.middleware)
      await fn(ctx)
      ctx.res.end(ctx.body) 
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