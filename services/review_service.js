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

const createReview = async (req, res) => {
  const { title, body, stars, likeCount, date } = req.body;
  const newReview = await Review.create({
    title: title,
    body: body,
    stars: stars,
    like_count: likeCount,
    date: date,
  });
  res.status(201).json(newReview);
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
};
