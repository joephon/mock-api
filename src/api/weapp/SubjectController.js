import Extend from '../../classes/Extend'
import { router, required, expect, list } from '../../decorators'

const obj = {
  imgList: ['https://ooxx.png'],
  goodsList: [
    { price: 100.0, quantities: 2, description: 'des' },
    { price: 100.0, quantities: 2, description: 'des' },
    { price: 100.0, quantities: 2, description: 'des' },
    { price: 100.0, quantities: 2, description: 'des' },
  ],
  type: 1,
  status: 1,
  description: 'des',
  autoStop: true,
  endTime: 0,
  limit: 20,
  needPhoneNumber: true,
  needRealName: true,
  needEmail: false
}; 

/**
 * @apiDefine SUBJECT 项目
 * 项目结构
 */
@router({ prefix: '/weapp/subject' })
export default class SubjectController extends Extend {
  /**
   *
   * @api {get} /weapp/subject 获取项目列表
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token信息
   * @apiParam {Number} [type=1] 查询条件 1=报名 2=团购
   * @apiParam {Number} [status=1] 可选项 1=接龙中 2=已截止
   * @apiParam {Object} [sort={createdAt:-1}] 排序 默认倒序
   * @apiParam {Number} [page=1] 页码
   * @apiParam {Number} [pageSize=20] 分页长度
   */
  @router.get('/')
  @list
  async getSubjects(ctx) {
    const { type, status, page, pageSize, sort } = ctx.request.query;

    return super.success({
      list: [...obj],
      total: 20,
      next: 2
    });
  }

  /**
   *
   * @api {post} /weapp/subject 创建项目
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} description 描述
   * @apiParam {Number} [type=1] 项目类型 默认1=报名 2=团购
   * @apiParam {String[]} [imgList] 图片列表
   * @apiParam {Object[]} [goodsList] 商品类型
   * @apiParam {Number} [status=1] 状态
   * @apiParam {Number} [limit=0] 截止人数 不传默认无限
   * @apiParam {Boolean} [autoStop=false] 自动截止
   * @apiParam {Boolean} [needPhoneNumber=false] 报名需要填手机
   * @apiParam {Boolean} [needRealName=false] 报名需要填收货人姓名
   * @apiParam {Boolean} [needEmail=false] 报名需要填写邮箱
   * @apiParam {String} description 项目描述
   */
  @router.post('/')
  @required({ body: { description: String }, type: Number })
  async createSubject(ctx) {
    const { id } = ctx.decoded;

    const subject = {
      createdBy: id,
      ...obj
    };
  }
}
