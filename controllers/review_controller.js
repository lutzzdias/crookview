const { Router } = require("express");
const service = require("../services/review_service");

const router = Router();

router.get("/", service.getReviews);
router.get("/:id", service.getReviewById);

router.post("/", service.createReview);

module.exports = router;
