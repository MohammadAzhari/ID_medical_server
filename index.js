const express = require("express");
const cors = require("cors");
const { connectDB } = require("./utils/database");
const router = require("./routes/allroutes");
const errorHandler = require("./middlewares/error");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}`);
});
