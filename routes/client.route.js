const express = require("express");

const router = express.Router();
const ClientController = require("../controllers/client.controller");

// router.get("/login", (req, res) => {
//   res.send("hi from client");
// });

router.post("/signup", ClientController.clientSignup);

router.post("/login", ClientController.clientLogin);

module.exports = router;
