const express = require("express");
require("./database");
const cors = require("cors");

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/ambulances", require("./routes/ambulances"));

async function main() {
  await app.listen(app.get("port"));
  console.log("Servidor en el puerto", app.get("port"));
}

main();
