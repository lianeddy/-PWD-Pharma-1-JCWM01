const express = require("express");
const cors = require("cors");


const PORT = 3300;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('public'))

const {adminRoute} = require('./routers')

app.use('/admin',adminRoute)

app.listen(PORT, () => console.log("API Running: ", PORT));
