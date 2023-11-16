const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { readdirSync } = require('fs');
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
readdirSync("./routes").map((r) => {
    app.use("/", require("./routes/" + r));
});

// database connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log("connect to database"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

