const mongoose = require("mongoose");

const tickets = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  number: { type: Number, default: 0 },
  role: { type: String, default: "Support" },
  toggle: { type: String, default: "on" }
});


module.exports = mongoose.model("Tickets", tickets);
