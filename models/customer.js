const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const customerSchema = new Schema(
  {
    cardCode: {type: String, maxlength: 20, required: true, unique: true},
    cardName: {type: String, required: true},
    active: {type: Boolean, required: true, default: true}
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;