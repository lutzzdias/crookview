const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./config/auth")(passport);

const review_controller = require("./controllers/review_controller");
const item_controller = require("./controllers/item_controller");
const user_controller = require("./controllers/user_controller");

const home_view_controller = require("./frontend/controllers/home_view_controller");

const app = express();
const PORT = 3060;

app.use(express.json());
app.use(
  session({
    secret: "crook",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// EJS config
app.set("view engine", "ejs");
app.set("views", "./frontend/views");
app.use(express.static("./frontend/"));

app.get("/", async (req, res) => {
  home_view_controller.getView(req, res);
});

app.use("/api/review", review_controller);
app.use("/api/item", item_controller);
app.use("/api/user", user_controller);

app.listen(PORT, () => console.log(`api running on: http://localhost:${PORT}`));
