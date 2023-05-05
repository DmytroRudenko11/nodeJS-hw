const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { HttpError } = require("../helpers");
const { controllerDecorator } = require("../utils/controller-decorator");
const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Invalid password or email");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Invalid password or email");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  res.json({
    token,
  });
};

module.exports = {
  signUp: controllerDecorator(signUp),
  signIn: controllerDecorator(signIn),
};
