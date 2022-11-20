const { Router } = require("express");
const service = require("../services/user_service");
const router = Router();
const passport = require('passport');

router.post("/", service.createUser);

router.get("/", service.getUsers);

router.get("/:id", service.getUserById);

router.post("/login",
    passport.authenticate('local', 
    {failureRedirect: 'login'}),
    (req, res) =>{
        res.send(req.user.id);
//        res.redirect('/');
    }
);

module.exports = router;
