import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import onlineUsers from "../OnlineUsers";
import bcrypt from "bcryptjs";

export async function getUserProfile(req: Request, res: Response) {
  try {
    const userId = (req.user as jwt.JwtPayload).id;
    if (!userId) {
      res.status(401).json({
        status: "success",
        message: "Unauthorized. Please Login First",
        data: null,
      });
      return;
    }
    const user = await User.findOne({ _id: userId }).select(
      "_id username email"
    );
    if (!user) {
      res.status(400).json({
        status: "success",
        message: "User Not Found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "User Details fetched successfully",
      data: user,
    });
    return;
  } catch (e: unknown) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
    return;
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const userId = (req.user as jwt.JwtPayload).id;
    const users = await User.find({_id:{$ne:userId}}).select("_id username email");

    const modifiedUserList = users.map((user) => ({
      ...user.toObject(),
      online: onlineUsers.has(user._id.toString()),
    }));

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: modifiedUserList,
    });
    return;
  } catch (e: unknown) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
    return;
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  try {
    const userId = (req.user as jwt.JwtPayload).id;
    const { email, username } = req.body;

    if (!userId) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized. Please Login First",
        data: null,
      });
      return;
    }

  
    if (!email || !username) {
      res.status(400).json({
        status: "error",
        message: "Email and username are required",
        data: null,
      });
      return;
    }

    const existingUserWithEmail = await User.findOne({ 
      email, 
      _id: { $ne: userId } 
    });
    
    if (existingUserWithEmail) {
      res.status(400).json({
        status: "error",
        message: "Email is already taken by another user",
        data: null,
      });
      return;
    }
    const existingUserWithUsername = await User.findOne({ 
      username, 
      _id: { $ne: userId } 
    });
    
    if (existingUserWithUsername) {
      res.status(400).json({
        status: "error",
        message: "Username is already taken by another user",
        data: null,
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, username },
      { new: true, runValidators: true }
    ).select("_id username email");

    if (!updatedUser) {
      res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUser,
    });
    return;
  } catch (e: unknown) {
    console.error("Error updating user profile:", e);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
    return;
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const userId = (req.user as jwt.JwtPayload).id;
    const { oldPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized. Please Login First",
        data: null,
      });
      return;
    }

   
    if (!oldPassword || !newPassword) {
      res.status(400).json({
        status: "error",
        message: "Old password and new password are required",
        data: null,
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        status: "error",
        message: "New password must be at least 6 characters long",
        data: null,
      });
      return;
    }

    const user = await User.findById(userId).select("password");
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
      return;
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      res.status(400).json({
        status: "error",
        message: "Old password is incorrect",
        data: null,
      });
      return;
    }


    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedNewPassword },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        status: "error",
        message: "Failed to update password",
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
      data: null,
    });
    return;
  } catch (e: unknown) {
    console.error("Error changing password:", e);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
    return;
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = (req.user as jwt.JwtPayload).id;
    const { password } = req.body;

    if (!userId) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized. Please Login First",
        data: null,
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        status: "error",
        message: "Password is required to delete account",
        data: null,
      });
      return;
    }


    const user = await User.findById(userId).select("password");
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        status: "error",
        message: "Password is incorrect",
        data: null,
      });
      return;
    }


    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({
        status: "error",
        message: "Failed to delete user",
        data: null,
      });
      return;
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

 

    res.status(200).json({
      status: "success",
      message: "Account deleted successfully",
      data: null,
    });
    return;
  } catch (e: unknown) {
    console.error("Error deleting user:", e);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
    return;
  }
}

