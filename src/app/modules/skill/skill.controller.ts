import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";

const createSkillIntoDB = catchAsync(async (req, res) => {
  const result = await SkillServices.createSkillIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill is created succesfully",
    data: result,
  });
});

const getAllSkillFromDB = catchAsync(async (req, res) => {
  const result = await SkillServices.getAllSkillFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill are retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const deleteSkillFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.deleteSkillFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill is deleted successfully",
    data: result,
  });
});

export const SkillControllers = {
  createSkillIntoDB,
  getAllSkillFromDB,
  deleteSkillFromDB,
};
