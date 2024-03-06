const express = require("express");

const router = express.Router();

router.get("/add", (req, res) => {
  res.send("hi");
});

module.exports = router;
