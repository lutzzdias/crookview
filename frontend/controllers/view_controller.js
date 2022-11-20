const axios = require("axios");
const { Router } = require("express");
const router = Router();

const getHomeView = async (req, res) => {
  info = await getInfo();
  res.render("home", info);
};

const getInfo = async () => {
  const trendingInfo = await axios.get(
    "http://localhost:3060/api/item/trending"
  );
  const trendingItems = trendingInfo.data;
  const latestInfo = await axios.get("http://localhost:3060/api/item/");
  const latestItems = latestInfo.data.slice(0, 5);

  return {
    trending: trendingItems,
    latest: latestItems,
  };
};

router.get("/", async (req, res) => getHomeView(req, res));

module.exports = router;