const { Router } = require("express");
const service = require("../services/item_service");
const router = Router();

router.post("/", service.createItem);
router.get("/trending", service.getTrending);
router.get("/search", service.getItemByName);
router.get("/:type", service.getItems);
router.get("/get/:id", service.getItemById);
router.put("/:id", service.updateItem);
router.delete("/:id", service.deleteItem);

module.exports = router;
