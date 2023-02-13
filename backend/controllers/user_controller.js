const { Router } = require('express');
const service = require('../services/user_service');
const router = Router();
const passport = require('passport');
let loggedUserId = null;

router.post('/', service.createUser);

router.get('/', service.getUsers);

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: 'login' }),
  (req, res) => {
    res.send(req.user.id);
  }
);

router.get('/:id', service.getUserById);

module.exports = router;
