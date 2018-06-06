let express = require('express');
let router = require('./routes/router');
//创建应用对象
let app = express();
//配置静态文件
app.use(express.static('public'));

/*
* cors实现跨域
* */
app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.send(200);
  next();
});

app.use(router);

app.listen(3000,function () {
   console.log('服务器已启动...') 
});