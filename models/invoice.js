const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const invoiceSchema = new Schema(
  {
    ownerComp: { type: Schema.Types.ObjectId, required: true },
    invoiceNumber: Number,
    identificacion: String,
    nombre: String,
    total: Number,
    lines:[
      {itemCode: String, itemName: String, itemQuantity: Number, itemPrice: Number, lineTotal: Number}],
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;