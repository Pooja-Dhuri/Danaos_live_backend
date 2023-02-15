const express = require("express");
const app = express();
var cors = require("cors");
const port = 8080 || process.env.PORT;
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const mgmtrouter = require("./routes/auth.route");
const { notFound, errorhandle } = require("./middleware/errorhandler");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("home");
});
  
app.use("/user", mgmtrouter);
app.use(notFound);
app.use(errorhandle);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }

  console.log("listenign to the port " + port);
});
