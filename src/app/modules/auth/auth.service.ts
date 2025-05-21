import bcrypt from "bcrypt";
import httpStatus, { status } from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { createToken, verifyToken } from "./auth.utils";
import { StringValue } from "ms";

const loginUser = async (payload: any) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isCurrectPassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCurrectPassword) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT.JWT_ACCESS_SECRET as string,
    config.JWT.JWT_ACCESS_EXPIRES_IN as StringValue
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT.JWT_REFRESH_SECRET as string,
    config.JWT.JWT_REFRESH_EXPIRES_IN as StringValue
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isCurrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );

  if (!isCurrectPassword) {
    throw new AppError(status.UNAUTHORIZED, "Your Password is Wrong!");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.BCRYPT_SALt_ROUNDS)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
    },
    {
      password: newHashedPassword,
    }
  );

  return;
};

const refreshToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = verifyToken(token, config.JWT.JWT_REFRESH_SECRET as string);
  } catch (err) {
    throw new AppError(status.UNAUTHORIZED, "You are not autherized!");
  }

  // checking if the user is exist
  const user = await User.findOne({ email: decodedData.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT.JWT_ACCESS_SECRET as string,
    config.JWT.JWT_ACCESS_EXPIRES_IN as StringValue
  );

  return { accessToken };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
