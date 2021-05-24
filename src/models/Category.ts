import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId
  }
})

const Category = mongoose.model('categories', categorySchema)
export { Category }