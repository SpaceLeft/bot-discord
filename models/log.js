const mongoose = require("mongoose");

const log = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  channel: String,
  toggle: { type:String, default: "on" },
  
});


module.exports = mongoose.model("Log", log);