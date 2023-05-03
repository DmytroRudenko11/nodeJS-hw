const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;

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
