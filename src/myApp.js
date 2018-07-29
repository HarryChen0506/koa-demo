// 自己实现的koa
const Mykoa = require('./mykoa/application.js');
const app = new Mykoa();
app.use((ctx) => {
  console.log('log 1')
})
app.use((ctx) => {
  console.log('log 2')
})
app.use((ctx) => {
  const {req, res} = ctx
  console.log('ctx.url', ctx.url)
  // res.writeHead(200, {
  //   'Content-Type': 'text/html'
  // })
  // res.write('hello harry --')
  ctx.body = '1234' + ctx.url  
})
app.listen(3001, () => {
  console.log('listen on 3001')
})
console.log('app', app);