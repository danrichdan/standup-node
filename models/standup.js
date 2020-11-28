const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const standupSchema = new Schema({
  haveDone: [
    {
      ref: "HaveDone",
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  workingOn: [
    {
      ref: "WorkingOn",
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  blockers: [
    {
      ref: "Blockers",
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  
});

module.exports = mongoose.model("Standup", standupSchema);
