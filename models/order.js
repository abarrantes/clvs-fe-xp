const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = new Schema(
  {
    orderNumber: {type: Number, maxlength: 10, required: true, unique: true},
    cardCode: String,
    cardName: String,
    lines:[{itemCode: String, itemName: String, itemQuantity: Number, itemPrice: Number, lineTotal: Number}],
    total: Number,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;