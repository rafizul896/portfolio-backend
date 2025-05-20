import status from "http-status";
import { AuthServices } from "./auth.service";
import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, ...others } = result;

  res.cookie("refreshToken", refreshToken, { secure: false, httpOnly: true });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: others,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token is retrieved succesfully!s",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request, res) => {
    const user = req.user;
    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Password changed Successfully!",
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
