const { Item } = require("../models");

const getItems = async (req, res) => {
  try {
    const item = await Item.findAll();
    res.status(200).json(item);
  } catch (error) {
    handleError(error, res);
  }
};

const getItemById = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findByPk(id);

    if (item == null) return res.status(404).send("Item not found.");

    res.status(200).json(item);
  } catch (error) {
    handleError(error, res);
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
    res.status(201).json(newItem);
  } catch (error) {
    handleError(error, res);
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
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
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
};
