import { Request } from "express";
import { IUploadedFile } from "../../interfaces/file";
import { ISkill, ISkillFilters } from "./skill.interface";
import { Skill } from "./skill.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createSkillIntoDB = async (req: Request) => {
  const file = req.file as IUploadedFile;
  const skillData = req.body;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    skillData.icon = uploadToCloudinary?.secure_url;
  }

  const lastSkill = await Skill.findOne().sort({ order: -1 });
  const nextOrder = lastSkill ? lastSkill.order + 1 : 1;

  const result = await Skill.create({ ...skillData, order: nextOrder });
  return result;
};

const getAllSkillFromDB = async (filters: ISkillFilters = {}) => {
  const { category, page = 1, limit = 10 } = filters;

  const query: Record<string, unknown> = {};

  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;

  const result = await Skill.find(query)
    .sort({ order: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Skill.countDocuments(query); // total count for pagination info

  return {
    data: result,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

const deleteSkillFromDB = async (id: string) => {
  const deletedSkill = await Skill.findByIdAndDelete(id);

  if (!deletedSkill) {
    throw new Error("Skill not found or already deleted.");
  }

  return deletedSkill;
};

export const SkillServices = {
  createSkillIntoDB,
  getAllSkillFromDB,
  deleteSkillFromDB,
};
