const express = require("express");
const router = express();
const SchemaUser = require("../core/schema/user");
var ObjectId = require("mongoose").Types.ObjectId;

let array = [
  {
    username: "Tuấn phạm 12",
    email: "Phamtuan@gmail.com",
    birthdate: "1998-01-5",
  },
  {
    username: "Tran Danh",
    email: "DanhTrang31@gmail.com",
    birthdate: "2001-01-25",
  },
  {
    username: "Mongoose DTS",
    email: "Mongoose@gmail.com",
    birthdate: "1998-06-06",
  },
];
router.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  SchemaUser.create(array, (err, data) => {
    if (err) {
      res.send("Đã tồn tại hoặc lỗi xảy ra");
    } else {
      res.send(data);
    }
  });
});

router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  SchemaUser.find()
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.send("Không thể lấy dữ liệu");
    });
});

// GET
router.get("/getUserById", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var name = req.query.name;
  var email = req.query.email;
  var query;
  if (name === undefined && email === undefined) {
    query = {};
  } else if (name !== undefined && email === undefined) {
    query = { username: { $regex: name } };
  } else if (name === undefined && email !== undefined) {
    query = { email: { $regex: email } };
  } else {
    query = { username: { $regex: name }, email: { $regex: email } };
  }

  SchemaUser.find(query)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ status: -1, messages: err });
    });
});

// POST

router.post("/update", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var username = req.body.username;
  var email = req.body.email;
  var bird = req.body.bird;
  var _id = ObjectId(req.query.id1);
  let filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!_id) {
    res.json({ status: -1, messages: "Not Found Id" });
  } else if (
    username === undefined ||
    email === undefined ||
    bird === undefined
  ) {
    res.json({ status: -1, messages: "Request is not accecpt" });
  } else if (!filter.test(email)) {
    res.json({ status: -1, messages: "Email is wrong" });
  } else {
    SchemaUser.findByIdAndUpdate(
      _id,
      { username: username, email: email, bird: bird },
      (err, data) => {
        if (err) return err;
        res.json({
          status: 0,
          messages: "Update User Success",
          data: data,
          success: true,
        });
      }
    );
  }
});

module.exports = router;
