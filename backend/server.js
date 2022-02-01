const express = require("express");
const configDB = require("./config/configDB");
// const configDB = require("..configDB/config/configDB");
require('dotenv').config({path:"./config/.env"})
const authRouter = require("./routes/authRouter")
const app = express();
configDB()
app.use(express.json())
app.use("/api",authRouter)


const PORT = 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("Server is running on port", PORT)
);