import { body } from "express-validator";

export const updateProfileValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email Field is required")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),

  body("username")
    .trim()
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 5, max: 15 })
    .withMessage("Username should be greater than 5 and less than 15")
    .notEmpty()
    .withMessage("Username is required")
    .escape(),
];
