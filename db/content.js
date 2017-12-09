/* 内容信息 */

var mongoose = require('./db.js')
var Schema = mongoose.Schema

var contentSchema = new Schema({
  createTime: Number,
  contentType: String,
  title: String,
  content: String
})

module.exports = mongoose.model('Content',contentSchema);
