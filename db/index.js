const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  gothram: String,
  number: Number,
  address: String,
  paymentStatus: String,
  data1: [{
    relation: String,
    name: String,
    gothram:String,
    rupam: String
  }],
  data2: [{
    relation: String,
    name: String,
    gothram:String,
    rupam: String
  }]
});

const User = new mongoose.model('User', userSchema);

module.exports = { User }