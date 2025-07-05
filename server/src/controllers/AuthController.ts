import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const createToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: "1d",
  });
};

const sendTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: "error", data: null, errors: errors.array() });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({
        status: "error",
        message: "JWT secret not configured",
        data: null,
      });
      return;
    }

    const { username, email, password } = req.body;

    const userExists = await User.exists({ email });
    if (userExists) {
      res.status(400).json({
        status: "error",
        message: "Email is already taken",
        data: null,
      });
      return;
    }
    const userNameTaken = await User.exists({ username });
    if (userNameTaken) {
      res.status(400).json({
        status: "error",
        message: "Username is already taken",
        data: null,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id.toString());
    sendTokenCookie(res, token);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e: any) {
    res.status(500).json({
      status: "error",
      message: e.message || "Internal Server Error",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ status: "error", data: null, errors: errors.array() });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({
        status: "error",
        message: "JWT secret not configured",
        data: null,
      });
      return;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        status: "error",
        message: "Email not registered",
        data: null,
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password",
        data: null,
      });
      return;
    }

    const token = createToken(user._id.toString());
    sendTokenCookie(res, token);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e: unknown) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
      data: null,
    });
  } catch (e: unknown) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: null,
    });
  }
};
