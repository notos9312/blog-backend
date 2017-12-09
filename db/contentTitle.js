/* 内容标题信息 */

var mongoose = require('./db.js')
var Schema = mongoose.Schema

var contentTitleSchema = new Schema({
  createTime: Number,
  contentType: String,
  title: String,
  objectId: String
})

module.exports = mongoose.model('Content_title',contentTitleSchema);
