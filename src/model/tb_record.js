const Sequelize = require('sequelize')
const sequelize = require('../db')

const Record = sequelize.define('tb_record', {
  msgid: {
    type: Sequelize.STRING
  },
  fromusername: {
    type: Sequelize.STRING
  },
  tousername: {
    type: Sequelize.STRING
  },
  msgtype: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  picurl: {
    type: Sequelize.STRING,
  },
  mediaid: {
    type: Sequelize.STRING,
  },
  isreply: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  }
})
// force: true will drop the table if it already exists
// Record.sync({ force: false }).then(() => {
//   // Table created
//   return Record.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   })
// })

module.exports = Record