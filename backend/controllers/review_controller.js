const { Router } = require("express");
const service = require("../services/review_service");

const router = Router();

router.post("/", service.createReview);
router.get("/", service.getReviews);
router.get("/:id", service.getReviewById);
router.put("/:id", service.updateReview);
router.delete("/:id", service.deleteReview);

module.exports = router;
