const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT || 3001;

const auth = require("./routes/auth.route");

app.use(express.json());
app.use("/auth", auth);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening at http://localhost:${PORT}`);
});
