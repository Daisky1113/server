const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentModel = new Schema({
  head: String,
  body: String,
  bookId: { type: Schema.Types.ObjectId, ref: 'book' },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentModel)