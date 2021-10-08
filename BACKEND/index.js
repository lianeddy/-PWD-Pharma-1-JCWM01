const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const PORT = 3300;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bearerToken());

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated MySQL with express</h4>");
});

const { adminRoute, drugsRouters, userRouter } = require("./routers");

app.use("/obat", drugsRouters);
app.use("/user", userRouter);
app.use("/admin", adminRoute);

app.listen(PORT, () => console.log("API Running: ", PORT));
