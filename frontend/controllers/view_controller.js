const axios = require("axios");
const { Router } = require("express");
const router = Router();
const passport = require("passport");

var loggedUserId;
router.get("/", async (req, res) => await getHomeView(req, res));
router.get("/movies", async (req, res) => await getMoviesView(req, res));
router.get("/series", async (req, res) => await getSeriesView(req, res));
router.get("/books", async (req, res) => await getBooksView(req, res));
router.get("/:id", async (req, res) => await getItemView(req, res));
router.post("/user/login", async (req, res) => await login(req, res));

router.post("/review", async (req, res) => await createReview(req, res));

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await axios.post("http://localhost:3060/api/user/login", {
    email: email,
    password: password,
  });
  loggedUserId = response.data;
  getHomeView(req, res);
};
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

const getItemView = async (req, res) => {
  const id = req.params.id;

  const itemResponse = await axios.get(`http://localhost:3060/api/item/${id}`);
  const item = itemResponse.data;

  const itemsResponse = await axios.get("http://localhost:3060/api/item");
  const items = itemsResponse.data;

  res.render("item", { item: item, items: items });
};

const createReview = async (req, res) => {
  console.log(req.body);
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
