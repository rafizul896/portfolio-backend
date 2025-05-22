import { Request } from "express";
import { IExperience } from "./experience.interface";
import { Experience } from "./experience.model";
import { IUploadedFile } from "../../interfaces/file";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createExperienceIntoDB = async (req: Request) => {
  const file = req.file as IUploadedFile;
  const experienceData = req.body as IExperience;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    experienceData.companyLogo = uploadToCloudinary?.secure_url;
  }

  const lastExperience = await Experience.findOne().sort({ order: -1 });
  const nextOrder = lastExperience ? lastExperience.order! + 1 : 1;

  const result = await Experience.create({
    ...experienceData,
    order: nextOrder,
  });

  return result;
};

const getAllExperiencesFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query.page) | 1;
  const limit = Number(query.limit) | 10;

  const skip = (page - 1) * limit;
  const total = await Experience.countDocuments();

  const data = await Experience.find()
    .sort({ order: 1 })
    .skip(skip)
    .limit(limit);

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

const getSingleExperienceFromDB = async (id: string) => {
  const experience = await Experience.findById(id);

  if (!experience) {
    throw new Error("Experience not found");
  }

  return experience;
};

const updateExperienceIntoDB = async (req: Request) => {
  const file = req.file as IUploadedFile;
  const updatedData = req.body as Partial<IExperience>;
  const { id } = req.params;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    updatedData.companyLogo = uploadToCloudinary?.secure_url;
  }

  const updatedExperience = await Experience.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedExperience;
};

const deleteExperienceFromDB = async (id: string) => {
  const deleted = await Experience.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Experience not found or already deleted");
  }

  return deleted;
};

export const ExperienceServices = {
  createExperienceIntoDB,
  getAllExperiencesFromDB,
  getSingleExperienceFromDB,
  updateExperienceIntoDB,
  deleteExperienceFromDB,
};
