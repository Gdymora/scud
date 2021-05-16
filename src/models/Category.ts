import * as mongoose from 'mongoose';
import {  Schema } from 'mongoose';

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('categories', categorySchema)