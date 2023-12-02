const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/login", (req, res, next) => {
  res.send(`
    <form action="/message" method="GET">
      <input type="text" name="username" placeholder="username"/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.get("/message", (req, res, next) => {
  const username = req.query.username;
  res.cookie("username", username);
  res.redirect("/");
});

app.get("/", (req, res, next) => {
  const username = req.cookies.username || "Unknown User";
  res.send(`<p>${username}: ${fs.readFileSync("message.txt", "utf8")} </p>
    <form action="/send" method="POST">
      <input type="text" name="message" />
      <button type="submit">Send</button>
    </form>
     `);
});

app.post("/send", (req, res) => {
  const username = req.cookies.username || "Unknown User";
  const message = req.body.message;

  const existingMessages = fs.readFileSync("message.txt", "utf8");
  fs.writeFileSync("message.txt", existingMessages + message + "\n");
  res.redirect("/");
});

app.listen(3000);
