const express = require("express");

const router = express.Router();
const AdminController = require("../controllers/admin.controller");
const { isAdmin } = require("../middlewares/isAdmin");

// router.get("/login", (req, res) => {
//   res.send("hi from client");
// });

router.put("/verify/:id", isAdmin, AdminController.verifyClient);

module.exports = router;
