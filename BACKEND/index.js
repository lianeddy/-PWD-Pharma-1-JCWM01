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

const {
  adminRoute,
  drugsRouters,
  userRouter,
  userUploadRouter,
  cartRouter,
  rawDrugsRouter,
} = require("./routers");
const { raw } = require("mysql");

app.use("/obat", drugsRouters);
app.use("/user", userRouter);
app.use("/picture", userUploadRouter);
app.use("/admin", adminRoute);
app.use("/cart", cartRouter);
app.use("/prescription", rawDrugsRouter);

app.listen(PORT, () => console.log("API Running: ", PORT));
