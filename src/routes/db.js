const router = require('express').Router();
const Model = require('../model')


router.get('/', function (req, res) {
  res.end('about db operator!');
});

router.get('/init', function (req, res) {
  res.end('init db tables success!');
});


module.exports = router;