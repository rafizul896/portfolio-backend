import { NextFunction, Request, Response } from "express";
import config from "../config";
import AppError from "../errors/AppError";
import status from "http-status";
import { verifyToken } from "../modules/auth/auth.utils";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = req.headers.authorization!;

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }

      let verifyUser;

      try {
        verifyUser = verifyToken(token, config.JWT.JWT_ACCESS_SECRET as string);
      } catch (err) {
        throw new AppError(status.UNAUTHORIZED, "You are not autherized!");
      }

      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
