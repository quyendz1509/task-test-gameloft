const mongoose = require("mongoose");
const connected = mongoose.connect(
  "mongodb+srv://admin:4uPkF79JSC0LOACX@cluster0.2e2fi.mongodb.net/game_loft_task?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
module.exports = connected;
