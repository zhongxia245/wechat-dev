const express = require('express')
const process = require('process')
const app = require('./src/app')
const config = require('./config')

let port = 10003

app.use(express.static('./public'))

app.listen(port, function (err) {
  console.log(`app is running on port localhost:${port}`)

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function (err) {
    console.error("Caught exception:", err.stack)
  })
  process.on('unhandledRejection', function (reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack)
  })
})

