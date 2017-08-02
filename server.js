const express = require('express')
const app = require('./src/app')
const config = require('./config')

app.use(express.static('./public'))

app.listen(3000, function (err) {
  console.log('app is running on port localhost:3000')
  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function (err) {
    console.error("Caught exception:", err.stack)
  })
  process.on('unhandledRejection', function (reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack)
  })
})
