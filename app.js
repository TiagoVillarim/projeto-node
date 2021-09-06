const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const path = require("path")
//const mongoose = require("mongoose");

//configurações
    //body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //handlebars
    app.engine("handlebars", handlebars({defaultLayout: "main"}));
    app.set("view engine", "handlebars");

    //mongoose em breve

    //public
    app.use(express.static(path.join(__dirname, "public")))

//rotas

  app.use("/admin", admin)

//outros
const PORT = 8089

app.listen(PORT, () => {
  console.log("servidor rodando na porta http://localhost:8089")
})