const mongoose = require("mongoose");

const autorole = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  toggle: { type: String, default: "off" },
  autorole: { type: String, default: "null" },
  
});


module.exports = mongoose.model("Autorole", autorole);
