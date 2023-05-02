const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Dmytro:P19U7pjmwjxJm4Z9@cluster0.cqls2b5.mongodb.net/ContactList?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3333, () => {
      console.log("Database connection successful");
      console.log("Server is running port: 3333");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
