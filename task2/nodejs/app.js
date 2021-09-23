const express = require("express");
const app = express();
const PORT = 5000; // open port
const bodyParser = require("body-parser");
// Đường dẫn tĩnh
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// khởi tạo biến kết nối tới database MongoDB
const connected = require("./core/connected");
// Dẫn đến router
app.use("/", require("./router/router"));
// Gọi ejs
app.set("view engine", "ejs");
// xử lý bất đồng bộ khi truy cập server

connected
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is open");
    });
  })
  .catch((err) => console.log(err));
