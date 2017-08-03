const router = require('express').Router()
const wxAuth = require('../libs/wxAuth')
const turingRobot = require('../libs/turingRobot')
const autoReply = require('../libs/wxAutoReply')
const Record = require('../model/index.js').Record


router.get('/', wxAuth)

router.post('/', function (req, res) {
  //设置返回数据header
  res.writeHead(200, { 'Content-Type': 'application/xml' })
  console.log(req.body.xml)
  //关注后回复
  if (req.body.xml.event === 'subscribe') {
    let resMsg = autoReply('text', req.body.xml, '欢迎关注')
    res.end(resMsg)
  } else {
    switch (req.body.xml.content) {
      case '博客':
        let resMsg = autoReply('text', req.body.xml, 'http://www.izhongxia.com')
        res.end(resMsg)
        break
      default:
        let info = encodeURI(req.body.xml.content)
        turingRobot(info).then(function (data) {
          let response = JSON.parse(data)
          // 保存到数据库
          addMsgRecord(req.body.xml, response.text)
          let resMsg = autoReply('text', req.body.xml, response.text)
          res.end(resMsg)
        })
    }
  }
})

router.get('/robot', function (req, res) {
  let msg = req.query.msg || 'hello'
  turingRobot(msg).then(function (data) {
    res.end(data)
  })
})

/**
 * 把聊天记录保存起来
 * TODO:把用户的 formusername 变成明文的 名称
 * @param {any} data 
 * @param {any} replyContent 
 */
function addMsgRecord(data, replyContent) {
  let fromRecord = JSON.parse(JSON.stringify(data))
  let toRecord = JSON.parse(JSON.stringify(data))
  toRecord.isreply = 1
  toRecord.content = replyContent

  Record.bulkCreate([fromRecord, toRecord])
    .then(() => {
      console.log('add record success')
    })
}


module.exports = router