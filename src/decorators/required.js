export default (obj) => {
  // 提取必传参数
  const { body, params, query } = obj

  // 封装装饰器
  return (target, name, descriptor) => {
    // 保留原始函数
    const raw = descriptor.value
    descriptor.value = async (...args) => {
      const ctx = args[0];

      // 校验body
      if (body) {
        for (let key in body) {
          // 缺失直接中断请求返回错误
          if (!ctx.request.body[key]) {
            return target.miss(key)
          }

          // 强制转化参数
          if (typeof body[key] === 'function') {
            ctx.request.body[key] = body[key](ctx.request.body[key])
          }
        }
      }

      // 校验query
      if (query) {
        for (let key in query) {
          if (!ctx.request.query[key]) {
            return target.miss(key);
          }

          if (typeof query[key] === 'function') {
            ctx.request.query[key] = query[key](ctx.request.query[key]);
          }
        }
      }

      // 校验 params
      if (params) {
        for (let key in params) {
          if (!ctx.params[key]) {
            return target.miss(key);
          }

          if (typeof params[key] === 'function') {
            ctx.params[key] = params[key](ctx.params[key]);
          }
        }
      }

      return raw.apply(target, args);
    }
  }
}