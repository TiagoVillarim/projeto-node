const express = require("express");
const Router = express.Router()

Router.get("/", (req, res) => {
  res.render("admin/index")
});

Router.get("/posts", (req, res) => {
  res.send("pagina de posts")
});

Router.get("/categoria", (req, res) => {
  res.send("pagina de categorias")
});

module.exports = Router