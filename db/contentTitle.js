/* 内容标题信息 */

var mongoose = require('./db.js')
var Schema = mongoose.Schema

var contentTitleSchema = new Schema({
  createTime: Number,
  contentType: String,
  title: String,
  objectId: String,
  bSeen: Boolean
})

module.exports = mongoose.model('ContentTitle', contentTitleSchema, 'contentTitles');
