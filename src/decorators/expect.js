export default obj => {
  // 提取必传参数
  const { body, params, query } = obj;

  // 封装装饰器
  return (target, name, descriptor) => {
    // 保留原始函数
    const raw = descriptor.value;
    descriptor.value = async (...args) => {
      const ctx = args[0];

      // 校验body
      if (body) {
        for (let key in body) {
          // 布尔校验
          if (typeof target[body[key]] === 'function') {
            if (!target[body[key]](ctx.request.body[key])) {
              return target.invalid(key);
            }
          }
        }
      }

      // 校验query
      if (query) {
        for (let key in query) {
          if (typeof targe[query[key]] === 'function') {
            if (!targe[query[key]](ctx.request.query[key])) {
              return target.invalid(key);
            }
          }
        }
      }

      // 校验 params
      if (params) {
        for (let key in params) {
          if (typeof target[params[key]] === 'function') {
            if (!target[params[key]](ctx.params[key])) {
              return target.invalid(key);
            }
          }
        }
      }

      return raw.apply(target, args);
    };
  };
};
