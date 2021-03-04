const mongoose = require("mongoose");

const tr = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  msgid: { type: String, default: 0 },
  toggle: { type: String, default: "on" },
  reason: String

});


module.exports = mongoose.model("Tr", tr);