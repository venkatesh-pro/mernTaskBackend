const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: "./.env",
});

const userRouter = require("./routes/user");
const connectDb = require("./config/db");

const app = express();

// connect Db
connectDb();

// to get data from response req.body
app.use(express.json({}));
app.use(cors());

// api
app.use("/api", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listenning on PORT => ${PORT}`);
});
