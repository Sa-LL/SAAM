const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const URI =
  "mongodb+srv://pinedas:4GtqVE2seziuZaBk@cluster0-wwcjq.mongodb.net/saam?retryWrites=true&w=majority";

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(URI, options)
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => {
    console.log("Error: ", err);
  });
