const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gitShcema = new Schema({
  email: String,
  name: String,
  password: String
});

const Git = mongoose.model("Git", gitShcema);

module.exports = Git;
