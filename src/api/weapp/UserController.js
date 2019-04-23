import WechatOauth from 'yp-wechat-oauth';
import crypto from 'crypto-js'
import uuid from 'uuid/v1' 

import { router, required, expect, list } from '../../decorators';
import Extend from '../../classes/Extend';

const userInfo = {
  nickName: `Jacky Lee`,
  avatarUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2846223807,1214619332&fm=27&gp=0.jpg'
}

/**
 * @apiDefine USER 用户
 * 用户接口
 */

@router({ prefix: '/weapp/user' })
export default class UserController extends Extend {
  /**
   * 
   * @api {post} /weapp/user/login 登录
   * @apiGroup USER
   * @apiParam {String} code 微信登录code 
   */
  @router.post('/login')
  @required({ body: { code: String } })
  async login(ctx) {
    const { code } = ctx.request.body;

    const oauth = new WechatOauth(
      ctx.config.wxMinaAppId,
      ctx.config.wxMinaAppSecret,
    );

    const { openid, unionid } = await oauth.getJscode2session(code);

    const condition = unionid ? unionid : openid;

    let token = await super.sign({ id: condition });

    return super.success({ token, userInfo });
  }

  /**
   * 
   * @api {get} /weapp/user/self 获取当前用户信息
   * @apiGroup USER 
   * @apiHeader {String} Authorization token 信息 
   */
  @router.get('/self')
  async getCurrentUser(ctx) {
    const { id } = ctx.decoded

    return super.success(userInfo)
  }

  /**
   * 
   * @api {post} /weapp/user/self/phone 获取当前用户手机 
   * @apiGroup USER
   * @apiParam {String} code 微信登录code
   * @apiParam {String} iv 微信iv
   * @apiParam {String} encryptedData 微信加密用户信息
   */
  @router.post('/self/phone')
  @required({ body: { code: String, encryptedData: String, iv: String } })
  async getCurrentUserPhoneNumber(ctx) {
    let { code, encryptedData, iv } = ctx.request.bodyody;

    const oauth = new WechatOauth(
      ctx.config.wxMinaAppId,
      ctx.config.wxMinaAppSecret,
    );

    const { session_key } = await oauth.getJscode2session(code);

    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');
    session_key = Buffer.from(session_key, 'base64');

    const decipher = crypto.createDecipheriv('aes-128-cbc', session_key, iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    decrypted = JSON.parse(decrypted);

    return super.success(decrypted);

  }
}
