var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

// 引入mongoose的Model
var Content = require('./db/content.js')
var ContentTitle = require('./db/contentTitle.js')
var User = require('./db/user.js')

var app = express()
app.use(express.static(__dirname + '/src'))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/api/hello', function(req, res){
  res.send('Hello you~')
  // var tmp = {
  //   createTime: new Date().getTime(),
  //   contentType: 'articles',
  //   title: 'my title',
  //   content: 'my content'
  // }
  // insertContent(tmp, function(error, result){
  //   if (error) {
  //     res.send(error)
  //   } else {
  //     res.send(result)
  //   }
  // })
})

app.post('/api/login', urlencodedParser, function(req, res){
  var verify_username = req.body.username
  var verify_password = req.body.password
  // 查询语句
  var whereStr = {username: verify_username}
  // 用User Model来查询users集合
  User.find(whereStr, function(error, result){
    if (error) {
      res.send(JSON.stringify({ errCode: 999, errMsg: '数据库查询出错', msgType: 'error' }))
    } else {
      if (result[0].password === verify_password) {
        res.send(JSON.stringify({ errCode: 0, errMsg: '操作成功', msgType: 'success'}))
      } else {
        res.send(JSON.stringify({ errCode: 1, errMsg: '用户名或密码错误', msgType: 'error'}))
      }
    }
  })
})

app.post('/api/createContent', urlencodedParser, function(req, res){
  // 先插入contents集合，再把标题插入到contentTitles集合
  var contentData = req.body
  insertContent(contentData, function(contentError, contentResult){
    if (contentError) {
      console.log(contentError)
      res.send(JSON.stringify({ errCode: 998, errMsg: '数据库插入内容出错', msgType: 'error' }))
    } else {
      var titleData = {
        createTime: contentResult.createTime,
        contentType: contentResult.contentType,
        title: contentResult.title,
        objectId: contentResult._id
      }
      insertContentTitle(titleData, function(titleError, titleResult){
        if (titleError) {
          console.log(titleError)
          res.send(JSON.stringify({ errCode: 997, errMsg: '数据库插入标题出错', msgType: 'error' }))
        } else {
          res.send(JSON.stringify({ errCode: 0, errMsg: '操作成功', msgType: 'success'}))
        }
      })
    }
  })
})

app.post('/api/getContents', urlencodedParser, function(req, res){
  var whereStr = {}
  var opt = {
    __v:0,
    _id:0,
    createTime:1,
    contentType:1,
    title:1
  }
  if(req.body.contentType != "all")  {
    whereStr.contentType = req.body.contentType
  }
  ContentTitle.find(whereStr, function(error, result){
    if (error) {
      console.log(error)
      res.send(JSON.stringify({ errCode: 999, errMsg: '数据库查询出错', msgType: 'error' }))
    } else {
      // var sendData = {
      //   contentType: result.contentType,
      //   createTime: result.createTime,
      //   objectId: result.objectId,
      //   title: result.title
      // }
      var sendData = result
      for(var s in sendData){
        delete sendData[s]._id
        delete sendData[s].__v
      }
      res.send(sendData)
    }
  })
})

app.post('/api/getTheContent', urlencodedParser, function(req, res){
  var id = req.body.objectId
  Content.findById(id, function(error, result){
    if(error){
      console.log(error)
      res.send(JSON.stringify({ errCode: 999, errMsg: '数据库查询出错', msgType: 'error' }))
    } else {
      var sendData = {
        content: result.content,
        title: result.title
      }
      res.send(sendData)
    }
  })
})

app.post('/api/updateContent', urlencodedParser, function(req, res){
  var updateObjId = req.body.objectId
  var updateContent = req.body.content
  var updateTitle = req.body.title
  var whereTitleStr = {objectId: updateObjId}
  var updateContentStr = {content: updateContent, title: updateTitle}
  var updateTitleStr = {title: updateTitle}
  // 先修改content，再修改contentTitle
  Content.findByIdAndUpdate(updateObjId, updateContentStr, function(contentError, contentResult){
    if(contentError) {
      console.log(contentError)
      res.send(JSON.stringify({ errCode: 999, errMsg: '数据库查询出错', msgType: 'error' }))
    } else {
      // 修改content
      ContentTitle.update(whereTitleStr, updateTitleStr, function(titleError, titleResult){
        if(titleError) {
          console.log(titleError)
          res.send(JSON.stringify({ errCode: 999, errMsg: '数据库查询出错', msgType: 'error' }))
        } else {
          res.send(JSON.stringify({ errCode: 0, errMsg: '操作成功', msgType: 'success'}))
        }
      })
    }
  })
})

// 定义插入内容函数
function insertContent(contentData, callback) {
  var data = new Content(contentData)
  data.save(callback)
}

// 定义插入内容标题函数
function insertContentTitle(titleData, callback) {
  var data = new ContentTitle(titleData)
  data.save(callback)
}

// 监听端口
app.listen(2333, function(){
  console.log('访问的地址为：http://localhost:2333')
})
