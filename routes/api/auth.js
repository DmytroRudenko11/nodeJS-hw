const express = require("express");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/usersSchemas");
const userController = require("../../contollers/auth-controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signUpSchema),
  userController.signUp
);

router.post(
  "/signin",
  validateBody(schemas.signInSchema),
  userController.signIn
);

module.exports = router;
