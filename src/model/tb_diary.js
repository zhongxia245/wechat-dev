const Sequelize = require('sequelize')
const sequelize = require('../db')

const Diary = sequelize.define('tb_diary', {
  uid: {
    type: Sequelize.INTEGER
  },
  content: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.ENUM,
    values: ['text', 'image', 'video', 'audio', 'emoji', 'other'],
    defaultValue: 'text'
  }
})

// force: true will drop the table if it already exists
// Diary.sync({ force: false }).then(() => {
//   // Table created
//   return Diary.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   })
// })

module.exports = Diary