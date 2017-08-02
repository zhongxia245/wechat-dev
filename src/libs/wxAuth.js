/**
 * 微信认证
 */
const crypto = require('crypto')
const path = require('path')
const url = require('url')
const config = require('../../config')


//进行sha1加密
function sha1(str) {
  let shasum = crypto.createHash("sha1")
  shasum.update(str)
  str = shasum.digest("hex")
  return str
}

/**
 * 微信认证
 */
function wechatAuth(req, res) {
  let signature = req.query.signature
  let timestamp = req.query.timestamp
  let nonce = req.query.nonce
  let echostr = req.query.echostr

  /**
   * 加密/校验流程如下
   */
  // 1. 将token、timestamp、nonce三个参数进行字典序排序
  let array = new Array(config.token, timestamp, nonce)
  array.sort()
  let str = array.toString().replace(/,/g, "")

  // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
  let sha1Code = crypto.createHash("sha1")
  let code = sha1Code.update(str, 'utf-8').digest("hex")

  // 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (code === signature) {
    console.log('授权成功!')
    res.send(echostr)
  } else {
    console.log('授权失败!')
    res.send("auth error")
  }

}


module.exports = wechatAuth