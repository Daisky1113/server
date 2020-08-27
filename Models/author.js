const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
  name: String,
  country: String,
},
  { timestamps: true }
)

module.exports = mongoose.model('Author', authorSchema)