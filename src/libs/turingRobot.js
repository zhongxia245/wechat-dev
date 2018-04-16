/**
 * 图灵机器人
 * 回答挺好的，挺智能的
 */
const request = require('request');
const config = require('../../config');

function getTuringResponse(info) {
  if (typeof info !== 'string') {
    info = info.toString();
  }
  var options = {
    method: 'GET',
    url: 'http://www.tuling123.com/openapi/api?key=' + config.turingKey + '&info=' + info,
    headers: {
      'apikey': config.turingKey
    }
  };
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  })
}

module.exports = getTuringResponse;