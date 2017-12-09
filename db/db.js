var mongoose = require('mongoose')
var DB_URL = 'mongodb://59.110.136.203:27017/not-blog';

mongoose.Promise = global.Promise;

/**
 * 连接
 */
mongoose.connect(DB_URL, {useMongoClient:true});

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
