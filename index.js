const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errorHandler } = require("./services/error.service");

const apiRoutes = require("./routes/api.route");

const app = express();

const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
});

app.use("/api", apiRoutes);

app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/your-database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connection successful");

    app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  } catch (error) {
    console.error("Error connecting to DB or starting the server:", error);
  }
}

startServer();
