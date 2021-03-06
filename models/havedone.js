const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const haveDoneSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("HaveDone", haveDoneSchema);
