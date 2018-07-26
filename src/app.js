// 创建一个koa实例
const Koa = require('koa');
const app = new Koa();

// 响应
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000, () => {
    console.log('listen in 3000')
});
