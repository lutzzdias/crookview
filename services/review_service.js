const { Review } = require("../models/");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    return handleError(error, res);
  }
};

const getReviewById = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findByPk(id);

    if (review == null) return res.status(404).send("Review not found.");

    return res.status(200).json(review);
  } catch (error) {
    return handleError(error, res);
  }
};

const createReview = async (req, res) => {
  const { title, body, stars, likeCount, date } = req.body;
  try {
    const newReview = await Review.create({
      title: title,
      body: body,
      stars: stars,
      like_count: likeCount,
      date: date,
    });
    res.status(201).json(newReview);
  } catch (error) {
    return handleError(error, res);
  }
};

const updateReview = async (req, res) => {
  const id = req.params.id;
  const { title, body, stars, like_count, date } = req.body;
  try {
    // the update method returns [numberOfRowsAffected, List<Object> Rows]
    // The next line discards the number of rows affected and gets only the first row (it will always be one because we're updating by id)
    const [_, [result]] = await Review.update(
      {
        title: title,
        body: body,
        stars: stars,
        like_count: like_count,
        date: date,
      },
      { where: { id: id }, returning: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteReview = async (req, res) => {
  const id = req.params.id;
  try {
    const wasDeleted = await Review.destroy({
      where: { id: id },
      returning: true,
    });

    if (wasDeleted)
      return res.status(200).send("Review successfully destroyed.");
    else return res.status(404).send("Review not found.");
  } catch (error) {
    return handleError(error, res);
  }
};

const handleError = (error, res) => {
  console.log(error);
  return res.status(500).json({ error: error.message });
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
