import excel from 'node-excel-export';
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
 * @apiDefine SUBJECT 接龙
 * 接龙接口
 */
@router({ prefix: '/weapp/subject' })
export default class SubjectController extends Extend {
  /**
   *
   * @api {get} /weapp/subject 获取接龙列表
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token信息
   * @apiParam {Number} [belongs=1] 查询条件 1=我发布的 2=我参与的
   * @apiParam {Number} [type=1] 查询条件 1=报名 2=团购
   * @apiParam {Number} [status=1] 可选项 1=接龙中 2=已截止
   * @apiParam {Number} [sort=-1] 排序 默认倒序
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
   * @api {post} /weapp/subject 创建接龙
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} description 接龙描述
   * @apiParam {String} formId 用以触发微信消息推送的表单formId
   * @apiParam {Number} [type=1] 接龙类型 默认1=报名 2=团购
   * @apiParam {String[]} [imgList] 图片列表
   * @apiParam {Object[]} [goodsList] 商品列表
   * @apiParam {Number} [status=1] 状态 1=解控中 -1=已截止
   * @apiParam {Number} [limit=0] 截止人数 不传默认无限
   * @apiParam {Boolean} [autoStop=false] 自动截止
   * @apiParam {Boolean} [needPhoneNumber=false] 报名需要填手机
   * @apiParam {Boolean} [needRealName=false] 报名需要填收货人姓名
   * @apiParam {Boolean} [needEmail=false] 报名需要填写邮箱
   */
  @router.post('/')
  @required({ body: { description: String, formId: String } })
  async createSubject(ctx) {
    const { id } = ctx.decoded;

    const subject = {
      createdBy: id,
      ...obj
    };

    return super.success(subject);
  }

  /**
   *
   * @api {put} /weapp/subject/:id 编辑接龙
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} description 接龙描述
   * @apiParam {String} id 目标接龙id
   * @apiParam {String[]} [imgList] 图片列表
   * @apiParam {Object[]} [goodsList] 商品列表
   * @apiParam {Number} [status=1] 状态
   * @apiParam {Number} [limit=0] 截止人数 不传默认无限
   * @apiParam {Boolean} [autoStop=false] 自动截止
   * @apiParam {Boolean} [needPhoneNumber=false] 报名需要填手机
   * @apiParam {Boolean} [needRealName=false] 报名需要填收货人姓名
   * @apiParam {Boolean} [needEmail=false] 报名需要填写邮箱
   */
  @router.put('/:id')
  @required({ body: { description: String }, params: { id: String } })
  async editSubject(ctx) {
    const { id } = ctx.decoded;

    const subject = {
      createdBy: id,
      ...obj
    };

    return super.success(subject);
  }

  /**
   *
   * @api {delete} /weapp/subject/:id 删除接龙
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} id 目标接龙id
   */
  @router.delete('/:id')
  @required({ params: { id: String } })
  async deleteSubject(ctx) {
    const { id } = ctx.decoded;

    return super.success();
  }

  /**
   *
   * @api {post} /weapp/subject/copy/:id 复制接龙
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} id 目标接龙id
   */
  @router.post('/copy/:id')
  @required({ params: { id: String } })
  async copySubject(ctx) {
    const { id } = ctx.decoded;

    return super.success(obj);
  }

  /**
   *
   * @api {post} /weapp/subject/share/:id 生成分享接龙的卡片
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} id 目标接龙id
   */
  @router.post('/share/:id')
  @required({ params: { id: String } })
  async copySubject(ctx) {
    const { id } = ctx.decoded;

    return super.success({
      url: 'https://ooxx.jpg'
    });
  }

  /**
   *
   * @api {post} /weapp/subject/join/:id 参与接龙
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} id 目标接龙id
   * @apiParam {Number} quantities 接龙数量
   */
  @router.post('/join/:id')
  @required({ params: { id: String }, body: { quantities: Number } })
  async joinSubject(ctx) {
    const { id } = ctx.decoded;

    return super.success(obj);
  }

  /**
   *
   * @api {get} /weapp/subject/export/:id 导出接龙报表
   * @apiGroup SUBJECT
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} id 目标接龙id
   */
  @router.get('/export/:id')
  @required({ params: { id: String } })
  async exportSubject(ctx) {
    const { id } = ctx.decoded;

    const sheets = [];
    const sheetName = '接龙导出明细';
    const sheet = {
      name: sheetName,
      data: [obj],
      specification: {
        status: {
          displayName: '状态',
          headerStyle: {},
          width: '40',
          cellFormat(value) {
            if (value === 1) return '群报名';
            else if (value === 2) return '团购接龙';
          }
        },
        type: {
          displayName: '类型',
          headerStyle: {},
          width: '20',
          cellFormat(value) {
            if (value === 1) return '接龙中';
            else if (value === 2) return '已截止';
          }
        },
        description: {
          displayName: '描述信息',
          headerStyle: {},
          width: '20'
        }
      }
    };

    sheets.push(sheet);
    const report = excel.buildExport(sheets);
    ctx.attachment(`${sheetName}.xlsx`);
    ctx.body = report;
  }
}


