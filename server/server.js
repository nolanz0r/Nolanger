const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

const PORT = process.env.APP_PORT || 3001;

app.use(express.json());
app.use(cors());

//routes
const auth = require("./routes/auth.route");
const conversation = require("./routes/conversation.route");
const message = require("./routes/message.route");

app.use("/auth", auth);
app.use("/conversation", conversation);
app.use("/message", message);

mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening at http://localhost:${PORT}`);
});
