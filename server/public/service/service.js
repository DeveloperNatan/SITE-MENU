const prisma = require("../../data/prisma");

exports.Cadastro = async function (req, res) {
  const { name, description, category } = req.body;
  const price = parseFloat(req.body.price);
  try {
    await prisma.menu.create({
      data: {
        name,
        description,
        price,
        category,
      },
    });
    res.status(201).render("Index");
  } catch (error) {
    res.status(500).json({ error: "erro ao criar produto" });
  }
};

exports.CadastroUpdate = async function (req, res) {
  const { name, description, category } = req.body;
  const price = parseFloat(req.body.price);
  const id = parseInt(req.body.id);

  try {
    await prisma.menu.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        category: category,
        price: price,
      },
    });
    res.status(201).render("List");
  } catch (error) {
    res.status(404).json({ error: "Erro ao editar", details: error.message });
  }
};

exports.CadastroDelete = async function (req, res) {
  const id = parseInt(req.body.id);
  console.log(id);

  try {
    await prisma.menu.delete({
      where: {
        id: id,
      },
    });
    res.status(201).render("List");
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar", details: error.message });
  }
};
