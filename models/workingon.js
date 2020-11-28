const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workingOnSchema = new Schema({
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

module.exports = mongoose.model("WorkingOn", workingOnSchema);
