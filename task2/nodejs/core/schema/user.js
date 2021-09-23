const mongooes = require("mongoose");

const CreateUser = new mongooes.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  birthdate: {
    type: String,
  },
});
module.exports = mongooes.model("users", CreateUser);
