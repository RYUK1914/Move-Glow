const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  items: [{
    product: {
      name: String,
      price: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
