const { User } = require('../models');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return handleError(error, res);
  }
};

const createUser = async (req, res) => {
  const { username, email, image } = req.body;
  let { password } = req.body;

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, hashedPassword) => {
      if (error) return handleError(error, res);
      password = hashedPassword;
    });
  });

  try {
    const emailExists = await checkEmailExistence(email);

    if (emailExists)
      return res.status(400).send('Email is already registered.');

    const newUser = await User.create({
      username: username,
      password: password,
      email: email,
      image: image,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return handleError(error, res);
  }
};

const checkEmailExistence = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) return false;
  else return true;
};

const handleError = (error, res) => {
  console.log(error);
  return res.status(500).json({ error: error.message });
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(req);
  try {
    const user = await User.findByPk(id);
    if (user) return res.status(200).json(user);
    else return res.status(404).send('User not found.');
  } catch (error) {
    return handleError(error, res);
  }
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
};
