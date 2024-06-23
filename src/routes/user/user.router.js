const express = require("express");
const {
  handleValidationErrors,
} = require("../../utils/handleValidationErrors");
const userController = require("./user.controller");
const { createUserValidator, deleteUserValidator, resetPassValidator } = require("./user.validators");
const { checkAuth } = require("../../utils/checkAuth");
const { upload } = require("../../utils/upload");

const userRouter = express.Router();

userRouter.post(
  "/sign-up",
  createUserValidator,
  handleValidationErrors,
  userController.httpCreateUser
);

userRouter.post(
  "/sign-in",
  createUserValidator,
  handleValidationErrors,
  userController.httpUserSignIn
);

userRouter.get("/auth", checkAuth, userController.httpUsersAuth);

userRouter.delete(
  "/",
  checkAuth,
  deleteUserValidator,
  handleValidationErrors,
  userController.httpDeleteProfile
);



userRouter.post(
  "/reset-password",
  checkAuth,
  resetPassValidator,
  handleValidationErrors,
  userController.httpUserResetPassword
);


userRouter.post(
  "/upload-photo",
  checkAuth,
  upload.single("file"),
  userController.httpUploadUserImage
);






module.exports = userRouter;
