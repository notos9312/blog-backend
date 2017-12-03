var express = require('express')
var mongoCilent = require('mongodb').MongoClient
var bodyParser = require('body-parser')

// 定义数据库的根路径
var BASE_DB_CONN_STR = 'mongodb://59.110.136.203:27017/'

var app = express()
app.use(express.static(__dirname + '/src'))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/api/hello', function(req, res){
  res.send('Hello you~')
})

app.post('/api/addUser', urlencodedParser, function(req, res){
  var data = {
    username: req.body.username,
    password: req.body.password
  }
  // 数据库操作
  mongoCilent.connect(BASE_DB_CONN_STR+'not-blog', function(err,db){
    console.log('addUser: connect db not-blog successfully!')
    insertData(db, 'users', data, function(result){
      // 显示结果
      console.log(result)
      if(result.hasOwnProperty('result') && result.result.ok){
        res.send('数据插入成功')
      } else {
        console.log('数据插入失败')
        res.send('数据插入失败')
      }
      db.close()
    })
  })
})

app.post('/api/login', urlencodedParser, function(req, res){
  var verify_username = req.body.username
  var verify_password = req.body.password
  mongoCilent.connect(BASE_DB_CONN_STR+'not-blog', function(err,db){
    console.log('login: connect db not-blog successfully!')
    selectData(db, 'users', {username: verify_username}, function(result){
      if(result[0].password && result[0].password === verify_password){
        res.send(JSON.stringify({errCode:0, errMsg:'操作成功', msgType:'success'}))
      } else {
        res.send(JSON.stringify({errCode:1, errMsg:'用户名或密码错误', msgType:'error'}))
      }
      db.close()
    })
  })
})

// 监听端口
app.listen(2333, function(){
  console.log('访问的地址为：http://localhost:2333')
})

// 定义插入数据函数
var insertData = function(db, coll, data, callback){ //coll: 指定的集合  data: 插入的数据
  db.collection(coll).insert(data, function(err, result){
    if(err){
      callback(err)
      return
    }
    // 调用传入的回调函数，将操作结果返回
    callback(result)
  })
}

// 定义查询数据函数
var selectData = function(db, coll, data, callback){
  db.collection(coll).find(data).toArray(function(err,result){
    if(err){
      callback(err)
      return
    }
    callback(result)
  })
}
