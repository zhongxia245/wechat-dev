const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser)         // 用来解析 XML 文件

//引入路由
const weixin = require('./routes/weixin')
const auth = require('./routes/auth')
const userinfo = require('./routes/userinfo')
const db = require('./routes/db')

//引入token刷新
const getToken = require('./libs/common')
getToken()


//创建菜单[个人公众号无法自定义菜单]
// const createMenu = require('./libs/wxCustomeMenu')
// createMenu()


//app配置
const app = express()
app.set('views', path.join(__dirname, '../views'))

//解析xml
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}))

//启用nunjucks模板
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

//启用路由
app.use('/wechat', weixin)
app.use(auth)
app.use(userinfo)
app.use('/db', db)

app.get('/', function (req, res) {
  res.render('index.html')
})

module.exports = app
