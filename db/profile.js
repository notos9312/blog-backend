/* 个人资料信息 */

var mongoose = require('./db.js')
var Schema = mongoose.Schema

var profileSchema = new Schema({
  profile: String
})

module.exports = mongoose.model('Profile', profileSchema);
