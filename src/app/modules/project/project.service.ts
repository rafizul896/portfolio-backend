import { Project } from "./project.model";
import { IProject } from "./project.interface";
import { IUploadedFile } from "../../interfaces/file";
import { Request } from "express";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createProject = async (req: Request) => {
  const file = req.file as IUploadedFile;
  const projectData = req.body as IProject;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    projectData.thumbnail = uploadToCloudinary?.secure_url;
  }

  const lastProject = await Project.findOne().sort({ order: -1 });
  const nextOrder = lastProject ? lastProject.order! + 1 : 1;

  const result = await Project.create({ ...projectData, order: nextOrder });
  return result;
};

const getAllProjects = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const total = await Project.countDocuments();
  const data = await Project.find().sort({ order: 1 }).skip(skip).limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data,
  };
};

const getProjectById = async (id: string) => {
  return await Project.findById(id);
};

const updateProject = async (req: Request) => {
  const file = req.file as IUploadedFile;
  const updatedData = req.body as Partial<IProject>;
  const { id } = req.params;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    updatedData.thumbnail = uploadToCloudinary?.secure_url;
  }

  const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedProject;
};

const deleteProject = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
