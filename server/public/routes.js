const express = require("express");
const router = express.Router();
const service = require("./service/service");

// page pedidos
router.get("/home", (req, res) => {
  res.render("Home");
});

// create
router.get("/cadastro", (req, res) => {
  res.render("Index");
});

// create
router.post("/cadastro", async function (req, res) {
  await service.Cadastro(req, res);
});

// read
router.get("/cadastro/lista", (req, res) => {
  res.render("List");
});

// update
router.post("/cadastro/editar/:id", async function (req, res) {
  await service.CadastroUpdate(req, res);
});

// delete
router.post("/cadastro/delete/:id", async function (req, res) {
  await service.CadastroDelete(req, res);
});

module.exports = router;
