const { User } = require("../models");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { username, password, email, image } = req.body;

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, salt) => {
      if (error) {
        return handleError(error, res);
      }
    });
  });

  try {
    const emailExists = checkEmailExistence(email);

    if (emailExists)
      return res.status(400).send("Email is already registered.");

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
  const user = await User.findOne(email);
  if (user == null) return false;
  else return true;
};

const handleError = (error, res) => {
  console.log(error);
  return res.status(500).json({ error: error.message });
};

module.exports = {
  createUser,
};
