var express = require('express');
var router = express.Router();


//注册路由
var comment = require('../json-data/comment.json');
router.get('/getComment',function (req,res) {
    res.send(comment)
})
var index = require('../json-data/index.json');
router.get('/getIndex',function (req,res) {
  res.send(index)
})
var item = require('../json-data/item.json');
router.get('/getItem',function (req,res) {
  res.send(item)
})
var service = require('../json-data/service.json');
router.get('/getService',function (req,res) {
  res.send(service)
})


module.exports =router;