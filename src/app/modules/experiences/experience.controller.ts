import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExperienceServices } from "./experience.service";

const createExperienceIntoDB = catchAsync(async (req, res) => {
  const result = await ExperienceServices.createExperienceIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperienceFromDB = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperiencesFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Experiences retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleExperienceFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ExperienceServices.getSingleExperienceFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Experiences retrieved successfully",
    data: result,
  });
});

const updateExperienceIntoDB = catchAsync(async (req, res) => {
  const result = await ExperienceServices.updateExperienceIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperienceFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.deleteExperienceFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceControllers = {
  createExperienceIntoDB,
  getAllExperienceFromDB,
  getSingleExperienceFromDB,
  updateExperienceIntoDB,
  deleteExperienceFromDB,
};
