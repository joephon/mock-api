import Extend from '../../classes/Extend'
import { router, required, expect, list } from '../../decorators'

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
    const { type, status, page, pageSize, sort } = ctx.request.query

    return super.success({
      list: [
        {
          imgList: ['https://ooxx.png'],
          type: 1,
          status: 1,
          description: 'des',
          autoStop: true,
          extraInfo: true,
          endTime: 0,
          limit: 20,
          phoneNumber: '13542422222',
          realName: 'Joephoh',
          mail: 'joephon@qq.com'
        }     
      ],
      total: 20,
      next: 2
    })
  }
}