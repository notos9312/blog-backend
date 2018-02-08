var mongoose = require('mongoose')

var DB_PROTOCOL = 'mongodb://';
var DB_USER = 'foo';
var DB_PWD = 'bar';
var DB_IP = 'xx.xx.xx.xx';
var DB_PORT = '27017';
var DB_DBNAME = '/blogName';

mongoose.Promise = global.Promise;

/**
 * 连接
 */
mongoose.connect(DB_PROTOCOL+DB_USER+':'+DB_PWD+'@'+DB_IP+':'+DB_PORT+DB_DBNAME, {useMongoClient:true});

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_IP+':'+DB_PORT+DB_DBNAME);
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
