const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const app = express();

app.use(
  session({
    secret: "sharad@king",
    resave: false, //session created to not modify
    saveUninitialized: false, //no value no create session
    store: MongoStore.create({
      mongoUrl :  "mongodb://127.0.0.1:27017/sessiondb" //it's check to exist database othervise create database
      ,collectionName : "sessionData", //collection name
      //ttl : 1000 * 60 * 60 * 24, //time to destroy alternative of cookie
      
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1000 milisecond * 60 = 1 minit * 60 minits *24 = 24 hource (1 Day)
  })
);

app.get("/", (r, res) => {
  if (r.session.username) {
    res.send("<h1>Username is : " + r.session.username + "</h1>");
  } else {
    res.send("<h1>Username is not set in session </h1>");
  }
});
app.get("/set-username", (r, res) => {
  r.session.username = "Sharad";
  res.send("<h1>Username has been set in session </h1>");
});
app.get("/get-username", (r, res) => {
  if (r.session.username) {
    res.send("<h1>Username is : " + r.session.username + "</h1>");
  } else {
    res.send("<h1>Username is not set in session </h1>");
  }
});
app.get("/logout", (r, res) => {
  r.session.destroy((err) => {
    if (err) {
      res.send(err);
    }
    res.send("<h1>Session has been destroyed </h1>");
  });
});

app.use((r, res) => {
  res.send("<h1>Page not found</h1>");
});
app.listen(4001, () => {
  console.log("server is running on http://localhost:4001");
});
