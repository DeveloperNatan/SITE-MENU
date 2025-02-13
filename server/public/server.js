const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.static(path.join(__dirname, '../../frontend/public/views/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// config EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/public/views/"));

// uso de rotas em outra camada
app.use("/", require("./routes"));

app.listen(5000);
