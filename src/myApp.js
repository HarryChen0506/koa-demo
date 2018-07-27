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
  console.log('req.url', req.url)
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write('hello harry --')
  res.end()
})
app.listen(3001, () => {
  console.log('listen on 3001')
})
console.log('app', app);