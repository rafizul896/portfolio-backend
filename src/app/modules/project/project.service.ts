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

const updateProject = async (id: string, payload: Partial<IProject>) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true });
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
