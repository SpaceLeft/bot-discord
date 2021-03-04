const mongoose = require("mongoose");

const welcomer = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  toggle: { type:String, default: "on" },
  message: { type:String, default: "None" },
  channel: { type:String, default: "null" }
  
});


module.exports = mongoose.model("Welcomer", welcomer);
