
import mongoose from 'mongoose'

interface PositionInterface extends mongoose.Document {
  name: string
  cost: number
  category: mongoose.Schema.Types.ObjectId
  user: mongoose.Schema.Types.ObjectId
}

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    ref: 'categories',
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId
  }
})


const Position = mongoose.model<PositionInterface>('positions', positionSchema)
export { Position }