const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const standupSchema = new Schema({
  haveDones: {
    type: Array,
    required: false,
  },
  workingOns: {
    type: Array,
    required: false,
  },
  blockers: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Standup", standupSchema);
