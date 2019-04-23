import qs from 'qs'

export default (target, name, descriptor) => {
  const raw = descriptor.value 
  descriptor.value = async (...args) => {
    args[0].request.query.page = parseInt(args[0].request.query.page, 10) || 1;
    args[0].request.query.pageSize = parseInt(args[0].request.query.pageSize, 10) || 20;
    args[0].request.query.sort = qs.parse(args[0].request.query.sort) || { createdAt: -1 };
    args[0].request.query.criteria = qs.parse(args[0].request.query.criteria) || {};
    args[0].request.query.options = qs.parse(args[0].request.query.options) || {};

    return raw.apply(target, args)
  }
}