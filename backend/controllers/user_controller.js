const { Router } = require("express");
const service = require("../services/user_service");
const router = Router();

router.post("/", service.createUser);
router.get("/", service.getUsers);
router.get("/:id", service.getUserById);

module.exports = router;
