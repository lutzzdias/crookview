const { Router } = require("express");
const service = require("../services/item_service");
const router = Router();


router.get("/", service.getItems);
router.get("/:id", service.getItemById);

router.post("/", service.createItem);
router.put("/:id", service.updateItem);


module.exports = router;
