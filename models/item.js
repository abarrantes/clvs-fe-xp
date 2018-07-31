const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema(
  {
    itemCode: {type: String, maxlength: 20, required: true, unique: true},
    itemName: {type: String, required: true},
    active: {type: Boolean, required: true, default: true}
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;