const review = require('../models/review')

const getReviews = async (req, res) => {
    // TODO: Fix query
    const reviews = await review.findAll()
}