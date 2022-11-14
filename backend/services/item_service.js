const { Item } = require("../models");

const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json(items);
  } catch (error) {
    return handleError(error, res);
  }
};

const getItemById = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findByPk(id);

    if (item) return res.status(200).json(item);
    else return res.status(404).send("Item not found.");
  } catch (error) {
    return handleError(error, res);
  }
};

const createItem = async (req, res) => {
  const { title, description, date, image, type } = req.body;

  try {
    const newItem = await Item.create({
      title: title,
      description: description,
      date: date,
      image: image,
      type: type,
    });

    return res.status(201).json(newItem);
  } catch (error) {
    return handleError(error, res);
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const { title, description, date, image, type } = req.body;

  try {
    const [_, [result]] = await Item.update(
      {
        title: title,
        description: description,
        date: date,
        image: image,
        type: type,
      },
      { where: { id: id }, returning: true }
    );

    if (result) return res.status(200).json(result);
    else return res.status(404).send("Item not found");
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    const wasDeleted = await Item.destroy({
      where: { id: id },
      returning: true,
    });

    if (wasDeleted) return res.status(200).send("Item successfully deleted.");
    else return res.status(404).send("Item not found.");
  } catch (error) {
    return handleError(error, res);
  }
};

const handleError = (error, res) => {
  console.log(error);
  return res.status(500).json({ error: error.message });
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
