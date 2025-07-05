import express from "express";
import {
  getUserProfile,
  getUsers,
  updateUserProfile,
  changePassword,
  deleteUser,
} from "../controllers/UserController";
import { updateProfileValidator } from "../validators/UserValidator";

const router = express.Router();

router.get("/", getUsers);
router.get("/profile", getUserProfile);
router.patch("/profile", updateProfileValidator, updateUserProfile);
router.patch("/change-password", changePassword);
router.delete("/account", deleteUser);

export default router;
