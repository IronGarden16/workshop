const Koa = require('koa');
const router = require('./routes');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();

app.use(bodyparser());
app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Listening to 3000...');
app.listen(3000);
