// 自己实现的koa
const delay = function (interval) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('delay')
      resolve()
    }, interval)
  })
}
const Mykoa = require('./mykoa/application.js');
const app = new Mykoa();
app.use(async (ctx, next) => {
  console.log('log 1')  
  ctx.body = '1'
  await next()
  ctx.body += '2'
  console.log('log 1 end')  
})
app.use(async (ctx, next) => {  
  console.log('log 2')
  ctx.body += '3'
  await delay(2000)
  await next()
  ctx.body += '4'
  console.log('log 2 end')  
})
app.use(async (ctx, next) => {
  const {req, res} = ctx
  // console.log('ctx.url', ctx.url)
  // res.writeHead(200, {
  //   'Content-Type': 'text/html'
  // })
  // // res.write('hello harry --')
  // await delay(2000)  
  ctx.body += '5'
  console.log('ctx.body', ctx.body)
  
})
app.listen(3001, () => {
  console.log('listen on 3001')
})
console.log('app', app);