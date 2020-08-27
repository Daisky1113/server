const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'author' },
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)