const express = require("express");

const userRoutes = require("./user.route");
const clientRoutes = require("./client.route");
const adminRoutes = require("./admin.routes");

const app = express();

app.use("/user", userRoutes);
app.use("/client", clientRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
