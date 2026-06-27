console.log("server.js started");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//require("dotenv").config();
const path = require("path");
const result = require("dotenv").config({
  path: path.join(__dirname, ".env")
});
console.log(result);
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

//console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});