const { Review, User } = require("../models/");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ include: User });
    return res.status(200).json(reviews);
  } catch (error) {
    return handleError(error, res);
  }
};

const getReviewById = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findByPk(id);
    if (review) return res.status(200).json(review);
    else return res.status(404).send("Review not found.");
  } catch (error) {
    return handleError(error, res);
  }
};

const createReview = async (req, res) => {
  // Save info from the request into variables
  const { title, body, stars, likeCount, date, userId, itemId } = req.body;

  try {
    // Validation
    const otherReviewBySameUser = await Review.findAll({
      where: { user_id: userId, item_id: itemId },
    });
    console.log(otherReviewBySameUser);

    if (otherReviewBySameUser.length)
      return res.status(400).send("User may only have 1 review per item.");

    // Create review
    const newReview = await Review.create({
      title: title,
      body: body,
      stars: stars,
      like_count: likeCount,
      date: date,
      user_id: userId,
      item_id: itemId,
    });

    // Return created Review in jSON
    return res.status(201).json(newReview);
  } catch (error) {
    return handleError(error, res);
  }
};

const addLikeToReviewById = async (req, res) => {
  const id = req.params.id;

  // TODO: Validate only one like per user

  try {
    const review = await Review.findByPk(id);
    let likeCount = review.like_count + 1;
    await review.update({
      like_count: likeCount,
    });

    return res.status(200).json(review);
  } catch (error) {
    return handleError(error, res);
  }
};

const updateReview = async (req, res) => {
  // Save info from the request into variables
  const reviewId = req.params.id;
  const { title, body, stars, like_count, date, userId } = req.body;

  try {
    // Find review
    const review = await Review.findByPk(reviewId);

    // Validation
    if (review == null) return res.status(404).send("Review not found.");
    if (review.user_id != userId)
      return res
        .status(403)
        .send("User cannot update a review posted by another user.");

    // Update
    await review.update({
      title: title,
      body: body,
      stars: stars,
      like_count: like_count,
      date: date,
    });

    // Return updated review in jSON
    return res.status(200).json(review);
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteReview = async (req, res) => {
  // Save info from the request into variables
  const reviewId = req.params.id;
  const { userId } = req.body;

  try {
    // Find review
    const review = await Review.findByPk(reviewId);

    // Validation
    if (review == null) return res.status(404).send("Review not found.");
    if (review.user_id != userId)
      return res
        .status(403)
        .send("User cannot delete a review posted by another user.");

    // Delete review
    await review.destroy();

    // Return success message
    return res.status(200).send("Review successfully deleted.");
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
  addLikeToReviewById,
  updateReview,
  deleteReview,
};
