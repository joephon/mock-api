import Extend from './classes/Extend'
import Base from './classes/Base';

export default async function gateway (ctx, next) {
  const { header, path } = ctx.request;
  const unAuth = ['/weapp/user/login']

  if (new RegExp(unAuth[0]).test(path)) {
    return next();
  }

  const token = header['Authorization'] || header['authorization']

  if (!token) {
    ctx.body = Base.prototype.miss('token');
    return
  }

  const decoded = Extend.prototype.decode(token);

  if (!decoded) {
    ctx.body = Base.prototype.invalid('token');
    return
  }

  let verified = null
  try {
    verified = await Extend.prototype.verify(token);
  } catch (error) {
    ctx.body = Base.prototype.expired();
    return
  }

  ctx.decoded = verified;

  return next();
}