const { Router } = require("express");
const service = require("../services/item_service");
const router = Router();


router.get("/itens", service.getAllItems);
//add routes here 

module.exports = router;
