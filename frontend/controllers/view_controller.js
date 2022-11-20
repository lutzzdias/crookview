const axios = require("axios");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => await getHomeView(req, res));
router.get("/movies", async (req, res) => await getMoviesView(req, res));
router.get("/series", async (req, res) => await getSeriesView(req, res));
router.get("/books", async (req, res) => await getBooksView(req, res));

const getHomeView = async (req, res) => {
  info = await getHomeInfo();
  res.render("home", info);
};

const getMoviesView = async (req, res) => {
  const response = await axios.get("http://localhost:3060/api/item/movies");
  const movies = response.data;
  res.render("movies", { movies: movies });
};

const getSeriesView = async (req, res) => {
  const response = await axios.get("http://localhost:3060/api/item/series");
  const series = response.data;
  res.render("series", { series: series });
};

const getBooksView = async (req, res) => {
  const response = await axios.get("http://localhost:3060/api/item/books");
  const books = response.data;
  res.render("books", { books: books });
};

const getHomeInfo = async () => {
  const trendingResponse = await axios.get(
    "http://localhost:3060/api/item/trending"
  );
  const trendingItems = trendingResponse.data;
  const latestResponse = await axios.get("http://localhost:3060/api/item/");
  const latestItems = latestResponse.data.slice(0, 5);

  return {
    trending: trendingItems,
    latest: latestItems,
  };
};

module.exports = router;
