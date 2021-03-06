const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    comps: [{type:Schema.Types.ObjectId}],
    activeComp: {type:Schema.Types.ObjectId}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;