const { Review } = require("../models/");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An unexpected error ocurred" });
  }
};

const getReviewById = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findByPk(id);

    if (review == null) return res.status(404).send("Review not found.");

    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An unexpected error ocurred" });
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
    console.log(error);
    return res.status(500).json({ error: "An unexpected error ocurred" });
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
    console.log(error);
    return res.status(500).json({ error: "An unexpected error ocurred" });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
};
