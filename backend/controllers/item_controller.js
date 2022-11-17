const { Router } = require("express");
const service = require("../services/item_service");
const router = Router();

router.post("/", service.createItem);
router.get("/", service.getItems);
router.get("/movies", service.getMovies);
router.get("/books", service.getBooks);
router.get("/series", service.getSeries);
router.get("/:id", service.getItemById);
router.put("/:id", service.updateItem);
router.delete("/:id", service.deleteItem);

module.exports = router;
