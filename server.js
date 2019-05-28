const Koa = require('koa')
const morgan = require('koa-morgan')
const path = require('path');
const koaStatic = require('koa-static')
const fs = require('fs')

const app = new Koa();

// logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// static assets
app.use(koaStatic(path.resolve(__dirname, '..', 'react-BBS实战/build')));

//异步读取文件的形式
app.use(async (ctx,next) =>{
  ctx.type = 'html';
  ctx.body = await fs.createReadStream(path.resolve(__dirname, '..', 'react-BBS实战/build', 'index.html'));

})

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
