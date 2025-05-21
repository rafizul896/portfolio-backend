import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProject(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await ProjectServices.getAllProjects(page, limit);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.getProjectById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.updateProject(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.deleteProject(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
