import express from "express";
import {
  registerRequestValidator,
  loginRequestValidator,
} from "../validators/AuthValidator";
import { register, login, logout } from "../controllers/AuthController";
const router = express.Router();

router.post("/register", registerRequestValidator, register);
router.post("/login", loginRequestValidator, login);
router.post("/logout", logout);

export default router;
