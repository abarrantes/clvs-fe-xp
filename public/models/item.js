const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    ownerComp: {type:Schema.Types.ObjectId, required:true}, 
    status: {type: Boolean, required: true, default: true},
    itemCode: {type: String, maxlength: 20, required: true, unique: true},
    itemName: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;