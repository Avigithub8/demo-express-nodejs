const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/message", (req, res) => {
  const username = req.query.username;
  res.cookie("username", username);
  res.redirect("/");
});

app.get("/", (req, res) => {
    const username = req.cookies.username || "Unknown User";
    const messages = fs.readFileSync("message.txt", "utf8");
    res.render("home.ejs", { username, messages });
  });

app.post("/send", (req, res) => {
  const username = req.cookies.username || "Unknown User";
  const message = req.body.message;

  const existingMessages = fs.readFileSync("message.txt", "utf8");
  fs.writeFileSync("message.txt", existingMessages + message + "\n");
  res.redirect("/");
});

app.get("/contactus", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contactus.html"));
});

app.post("/submit-contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

 
  console.log(`Contact Form Submission: Name - ${name}, Email - ${email}`);

  res.redirect("/success");
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "success.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
});

app.listen(3000);
 


