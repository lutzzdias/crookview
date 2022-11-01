const { Review } = require("../models/");

const getReviews = async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
};

module.exports = {
  getReviews,
};
