/* 用户信息 */

var mongoose = require('./db.js')
var Schema = mongoose.Schema

var userSchema = new Schema({
  username: String,
  password: String
})

module.exports = mongoose.model('User',userSchema);
