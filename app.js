const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const path = require("path")
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash")

//configurações
    //sessão
    app.use(session({
      secret: "cursonode",
      resave: true,
      saveUninitialized: true
    }))
    app.use(flash())
    //middleware
    app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      next()
    })

    //body-parser
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    //handlebars
    app.engine("handlebars", handlebars({defaultLayout: "main"}));
    app.set("view engine", "handlebars");

    //mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp", {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
            console.log("Conectado com sucesso!")
        }).catch((erro) =>{
            console.log("Erro ao conectar: " + erro)
        });

     //middleware
  

    //public
    app.use(express.static(path.join(__dirname, "public"))) 

//rotas

  app.use("/admin", admin)

//outros
const PORT = 8089

app.listen(PORT, () => {
  console.log("servidor rodando na porta http://localhost:8089/admin")
})