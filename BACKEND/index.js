const express = require("express");
const cors = require("cors");

const PORT = 3300;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated MySQL with express</h4>");
});

const { drugsRouters } = require("./routers");
const { userRouter } = require("./routers");

app.use("/obat", drugsRouters);
app.use("/user", userRouter);

app.listen(PORT, () => console.log("API Running: ", PORT));
