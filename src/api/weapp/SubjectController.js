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
   * @apiParam {Object} [criteria={type:1}] 查询条件
   * @apiParam {Object} [options={}] 可选项
   * @apiParam {Object} [sort={createdAt:-1}] 排序
   * @apiParam {Number} [page=1] 页码
   * @apiParam {Number} [pageSize=20] 分页长度
   */
  @router.get('/')
  @list
  async getSubjects(ctx) {
    const { criteria, options, page, pageSize, sort } = ctx.request.query

    return super.success({
      list: [
        {
          title: 'test',
          type: 1,
          description: 'des'
        }
      ],
      total: 20,
      next: 2
    })
  }
}