import Extend from '../../classes/Extend';
import { router, required, expect, list } from '../../decorators';

const obj = {
  imgList: ['https://ooxx.png'],
  type: 1,
  description: 'des',
  allow: true,
  contact: '135393989889'
};

/**
 * @apiDefine FEEABACK 反馈
 * 反馈接口
 */
@router({ prefix: '/weapp/feedback' })
export default class SubjectController extends Extend {
  /**
   *
   * @api {post} /weapp/feedback 创建反馈
   * @apiGroup FEEDBACK
   * @apiHeader {String} Authorization token 信息
   * @apiParam {String} description 接龙描述
   * @apiParam {String} formId 用以触发微信消息推送的表单formId
   * @apiParam {String} contact 手机或邮箱
   * @apiParam {Number} type 反馈类型 1=无法打开 2=闪退 3=卡顿 4=黑屏白屏 5=司机 6=界面错位 7=加载慢 8=其他异常 9=意见与建议
   * @apiParam {String[]} [imgList] 图片列表
   * @apiParam {Boolean} [allow] 允许客服反馈
   */
  @router.post('/')
  @required({ body: { description: String, formId: String } })
  async createSubject(ctx) {
    const { id } = ctx.decoded;

    const feedback = {
      createdBy: id,
      ...obj
    };

    return super.success(feedback);
  }
}
