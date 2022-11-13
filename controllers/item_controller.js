const { Router } = require("express");
const service = require("../services/item_service");
const router = Router();

router.post("/", service.createItem);
router.get("/", service.getItems);
router.get("/:id", service.getItemById);
router.put("/:id", service.updateItem);
router.delete("/:id", service.deleteItem);

module.exports = router;
