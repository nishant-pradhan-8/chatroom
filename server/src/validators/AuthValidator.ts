import { body } from "express-validator";
export const registerRequestValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email is required")
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

  body("password")
    .trim()
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginRequestValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),

  body("password")
    .trim()
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password is required"),
];
