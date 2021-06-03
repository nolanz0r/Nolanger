const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

require("dotenv").config();

const PORT = process.env.APP_PORT || 3001;

const authMiddleware = require("./middleware/authMiddleware");

//middleware
app.use(express.json());
app.use(cors());
app.use(authMiddleware);

//routes
const auth = require("./routes/auth.route");
const conversation = require("./routes/conversation.route")(io);
const message = require("./routes/message.route")(io);
const user = require("./routes/user.route");

app.use("/auth", auth);
app.use("/conversation", conversation);
app.use("/message", message);
app.use("/users", user);

io.on("connection", (socket) => {});

mongoose
  .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

server.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`App listening at http://localhost:${PORT}`);
});
