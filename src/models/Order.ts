import mongoose from 'mongoose'

interface OrderInterface extends mongoose.Document {
  date: Date
  order: number
  list: []
  user: mongoose.Schema.Types.ObjectId
}

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId
  }
})

const Order = mongoose.model<OrderInterface>('orders', orderSchema)
export { Order }