const { Review } = require("../models/");

const getReviews = async (req, res) => {
  const reviews = await Review.findAll();
  res.status(200).json(reviews);
};

const getReviewById = async (req, res) => {
  const id = req.params.id;
  const review = await Review.findByPk(id);

  if (review == null) return res.status(404).send("Review not found!");
  else return res.status(200).json(review);
};

module.exports = {
  getReviews,
  getReviewById,
};
