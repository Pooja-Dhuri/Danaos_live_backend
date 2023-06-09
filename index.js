const express = require("express");
const app = express();
var cors = require("cors");
const port = 8080 || process.env.PORT;
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const PaxInfo = require("./routes/pax.route");
const { notFound, errorhandle } = require("./middleware/errorhandler");
const adminrouter = require("./routes/admin.route");
const dishRouter = require("./routes/dishInfo");
const TableChairRouter = require("./routes/tablechair.router");
const cardRouter = require("./routes/paymentcard.route");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/admin", adminrouter);
app.use("/paxinfo", PaxInfo);
app.use("/dish",dishRouter);
app.use("/tablechair", TableChairRouter);
app.use("/cardinfo", cardRouter);

app.use(notFound);
app.use(errorhandle);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }

  console.log("listening to the port " + port);
});
