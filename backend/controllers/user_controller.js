const { Router } = require("express");
const service = require("../services/user_service");
const router = Router();
const passport = require('passport');
let loggedUserId = null;

router.post("/", service.createUser);

router.get("/", service.getUsers);

router.get("/:id", service.getUserById);

router.post("/login",
    passport.authenticate('local', 
    {failureRedirect: 'login'}),
    (req, res) =>{
        global.loggedUserId = req.user.id;
        res.render('/');
    }
);

module.exports = router;
