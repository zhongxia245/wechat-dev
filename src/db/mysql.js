const Sequelize = require('sequelize')
const config = require('../../config.js')


const dbType = config.db
const dbConfig = config[dbType]

// 连接数据库
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    // 字段以下划线（_）来分割（默认是驼峰命名风格）
    underscored: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize