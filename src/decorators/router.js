import Router from 'koa-router'
import Base from '../classes/Base'

function router(config) {
  const route = new Router(config)

  return (target) => {
    let methods = Object.getOwnPropertyDescriptors(target.prototype)

    for (let v in methods) {
      // 排除类的构造方法
      if (v !== 'constructor') {
        let fn = methods[v].value
        fn(route)
      }
    }
    return route
  }
}

const methods = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch', 'all']

methods.forEach((method) => {
  router[method] = (url) => {
    return (target, name, descriptor) => {
      const fn = descriptor.value
      descriptor.value = (router) => {
        router[method](url, async (ctx, next) => {
          let response = {};
          try {
            response = await fn(ctx, next)
          } catch (error) {
            if (process.env.production) {
              response = Base.prototype.reply(-999, Base.prototype.msg.ERROR_SERVER);
            } else {
              console.error(error);
              // 统一处理error日志
              // ErrorLog.create({ dateString: new Date().toLocaleDateString(), details: error.toString() })
              response = Base.prototype.reply(-999, Base.prototype.msg.ERROR_SERVER, error.toString());
            }
          } finally {
            const errMsg = response.errMsg;
            if (errMsg) {
              const kind = errMsg.split('_')[0];
              if (/ERROR/.test(kind)) {
                ctx.response.status = 400;
                ctx.response.message = errMsg
              } else if (/MISSING/.test(kind)) {
                ctx.response.status = 403;
                ctx.response.message = errMsg
              }
            }
            ctx.body = response;
          }
        })
      }
    }
  }
})

export default router