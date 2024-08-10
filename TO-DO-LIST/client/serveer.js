const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const items = require("./models/items");
const User = require("./models/user");
const { json } = require("react-router-dom");

mongoose.connect("mongodb://127.0.0.1:27017/login");

app.get("/", (req, res) => (res.send("hello")));
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.json(["exit", user.id, user.password]);
    } else {
      res.json("notexist");
    }
  });
  // User.create(req.body);
});
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.json(["exit", user.id]);
    } else {
      res.json("notexist");
      User.create(req.body);
    }
  });
});

app.post("/add", async (req, res) => {
  const item = await items.create(req.body).then((item) => res.json(item));
});
app.post("/delete", (req, res) => {
  const { item_id } = req.body;
  items.deleteOne({ _id: item_id }).then((item) => {
    res.json(item);
  });
});
app.put("/update", (req, res) => {
  const { updateitem, updatedItem } = req.body;
  items.findOne({ _id: updateitem._id }).then((item) => {
    item.item = updatedItem;
    item.save();
    res.json(item);
  });
});
app.post("/get", (req, res) => {
  items.find({ id: req.body.id }).then((item) => {
    res.json(item);
  });
});
app.listen(3001, () => {
  console.log("running");
});
