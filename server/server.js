const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT || 3001;

app.use(express.json());

//routes
const auth = require("./routes/auth.route");
app.use("/auth", auth);

mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening at http://localhost:${PORT}`);
});
