const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
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

router.get("/current", authenticate, userController.getCurrent);

router.post("/logout", authenticate, userController.logout);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  userController.updateAvatar
);

module.exports = router;
