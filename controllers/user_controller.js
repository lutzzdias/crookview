const { Router } = require("express");
const service = require("../services/user_service");
const router = Router();

router.post("/", service.createUser);


module.exports = router;