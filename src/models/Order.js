const mongoose = require('mongoose');

const orderCounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 },
});

const OrderCounter = mongoose.model('orderCounter', orderCounterSchema);

const itemSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
    },
    productprice: {
      type: Number,
    },
    quantity: {
      type: String,
    },
  },
  {
    // Exclude the '_id' field from the subdocument 'item'
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
    _id: false, // Exclude the '_id' field from the schema
  }
);

const orderSchema = new mongoose.Schema(
  {
    ordered_on: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    deliveryAddress: {
      type: String,
    },
    id: { type: Number },
    items: [itemSchema], // include the 'items' field as an array of subdocuments
  },
  {
    // Exclude the '_id' and '__v' fields from the main document
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Pre-save hook to update the 'id' field
orderSchema.pre('save', async function (next) {
  if (!this.id) {
    const counter = await OrderCounter.findByIdAndUpdate(
      { _id: 'orderId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

const OrderModel = mongoose.model('newOrders', orderSchema);

module.exports = OrderModel;
