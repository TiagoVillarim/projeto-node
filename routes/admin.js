const express = require("express");
const Router = express.Router();
require("../models/Categoria");
const Categoria = mongoose.model("categorias")

Router.get("/", (req, res) => {
  res.render("admin/index")
});

Router.get("/posts", (req, res) => {
  res.send("pagina de posts")
});

Router.get("/categorias", (req, res) => {
  res.render("admin/categorias")
});

Router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias")
});

Router.post("/categorias/nova", (req, res) => {

  var erros = []

  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    erros.push({texto: "texto invalido"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: "slug invalido"})
  }

  if(req.body.name.length < 2){
    erros.push({texto: "nome da categoria muito curto"})
  }

  if(erros.length > 0){
    res.render("admin/addcategorias", {erros:erros})
  }else{
    const novaCategoria = {
      name: req.body.name,
      slug: req.body.slug
    }
    
      new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "categoria salva com sucesso")
        res.redirect("/admin/categorias")
      }).catch((err) => {
        req.flash("error_msg", "houve um erro ao registar a categoria")
        console.log("houve um erro" + err)
      })  
  }
}); 


module.exports = Router