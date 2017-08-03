const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('tb_user', {
  user: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  opensid: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING,
    unique: true
  },
  disabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

// force: true will drop the table if it already exists
// User.sync({ force: false }).then(() => {
//   // Table created
//   return User.create({
//     user: 'zhongxia',
//     password: '123456',
//     token: 'Z6ugylFhoqjjrh9BInABEbGoFEVHCYlG7vw_LB_2v8xaTphsadztpoS98G_LAXP3Ad1rIjy7cMkoYNqnPZvbEA2XazwqEKcv9oPwwnvqDmxW-0CuhRGaXF5eLIWD5Au1DPWjAGATFM',
//     email: 'izhongxia@sina.com',
//     phone: '18201505222'
//   })
// })

module.exports = User