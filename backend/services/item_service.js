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
  // Save info from the request into variables
  const itemId = req.params.id;
  const { title, description, date, image, type, userId } = req.body;

  try {
    // Find Item
    const item = await Item.findByPk(itemId);

    // Validation
    if (!item) return res.status(404).send("Item not found");
    if (item.user_id != userId)
      return res
        .status(403)
        .send("User cannot update an item posted by another user.");

    // Update
    await item.update({
      title: title,
      description: description,
      date: date,
      image: image,
      type: type,
    });

    // Return updated item in jSON
    return res.status(200).json(result);
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteItem = async (req, res) => {
  // Save info from the request into variables
  const itemId = req.params.id;
  const { userId } = req.body;

  try {
    // Find item
    const item = await Item.findByPK(itemId);

    // Validation
    if (!item) return res.status(404).send("Item not found.");
    if (item.user_id != userId)
      return res
        .status(403)
        .send("User cannot delete an item posted by another user.");

    // Delete item
    await item.destroy();

    // Return success message
    return res.status(200).send("Item successfully deleted.");
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
