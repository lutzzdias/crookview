const express = require("express");

const review_controller = require("./controllers/review_controller");
const item_controller = require("./controllers/item_controller");

const app = express();
const PORT = 3060;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Home page");
});

app.use("/api/review", review_controller);
app.use("/api/item", item_controller);

app.listen(PORT, () => console.log(`api running on: http://localhost:${PORT}`));
