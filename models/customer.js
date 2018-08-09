const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  ownerComp: { type: Schema.Types.ObjectId, required: true },
  status: { type: Boolean, default: true },
  nombre: String,
  identificacion: { type: String, required:true}
}, {
    timestamps: true,
  });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
