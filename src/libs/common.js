'use strict'
const request = require('request')
const qs = require('querystring')
const fs = require('fs')
const config = require('../../config')

const GET_ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?'

/**
 * 获取 AccessToken
 */
function getAccessToken() {
  let queryParams = {
    'grant_type': 'client_credential',
    'appid': config.appId,
    'secret': config.appSecret
  }

  let wxGetAccessTokenBaseUrl = GET_ACCESS_TOKEN_URL + qs.stringify(queryParams)
  let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  }
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(JSON.parse(body))
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 保存 token 到文件中
 */
function saveToken() {
  getAccessToken().then(res => {
    let token = res['access_token']
    fs.writeFile('./token', token, function (err) {
      console.log('refresh token success:', token)
    })
  })
}


/**
 * 更新 Token
 */
function refreshToken() {
  saveToken()
  setInterval(function () {
    saveToken()
  }, 7000 * 1000)
}


module.exports = refreshToken