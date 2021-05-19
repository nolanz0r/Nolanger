const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT || 3001;

app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening at http://localhost:${PORT}`);
});
