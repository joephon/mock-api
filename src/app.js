import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import kcors from 'kcors';

import weappControllers from './api/weapp';
import config from './config';
import gateway from './gateway'

const app = new Koa();

// 上下文加入config
app.use(async (ctx, next) => {
  ctx.config = config;
  return next();
});

app.use(kcors());
app.use(koaStatic(config.uploadPath));
app.use(koaBody(config.koaBodyConfig));

app.use(gateway)

weappControllers.forEach(controller => {
  app.use(controller.routes());
});

app.listen(config.port, () => console.log(`server is running on port: ${config.port}`));
