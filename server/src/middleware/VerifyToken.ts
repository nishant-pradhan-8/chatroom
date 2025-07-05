import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        user: String | JwtPayload
      }
    }
  }
export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const jwtToken = req.cookies.token;

    if (!jwtToken) {
       res.status(401).json({
        status: "error",
        message: "User Not Authorized",
        data: null,
      });
      return
    }

    if (!process.env.JWT_SECRET) {
       res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: null,
      });
      return;
    }
 
    const decoded: string | jwt.JwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (e:any) {
    if (e instanceof jwt.JsonWebTokenError) {
       res.status(401).json({
        status: "error",
        message: "Invalid or expired token",
        data: null,
      });
    }
     res.status(500).json({
      status: "error",
      message: "An unexpected error occurred during token verification",
      data: null,
      error:e.message
    });
  }
};

