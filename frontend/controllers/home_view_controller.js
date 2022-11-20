const axios = require("axios");

const getView = async (req, res) => {
  trendingMovies = await getTrending();
  console.log(trendingMovies);
  res.render("home", trendingMovies);
};

const getTrending = async () => {
  const { data } = await axios.get("http://localhost:3060/api/item/trending");
  return data;
};

module.exports = {
  getView,
};
