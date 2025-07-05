import { body } from "express-validator";
export const messageRequestValidator = [
  body("senderId")
    .trim()
    .exists()
    .withMessage("Sender Id Field is Required")
    .notEmpty()
    .withMessage("Sender Id is required")
    .escape(),
  body("message")
    .trim()
    .exists()
    .withMessage("Message Field is Required")
    .notEmpty()
    .withMessage("Message is required")
    .escape(),
];
