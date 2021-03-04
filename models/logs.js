const mongoose = require("mongoose");

const logs = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  channelCreate: String,
  channelCreatetoggle: { type:String, default: "off" },
  channelCreateColor: String,
});


module.exports = mongoose.model("Logs", logs);