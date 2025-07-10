require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

const authRoute = require("./routes/auth.routes");

app.use(cors());

app.use(express.json());
app.use("/auth-api", authRoute);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
