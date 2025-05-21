import mongoose, { model } from "mongoose";
import { ISkill } from "./skill.interface";

const skillSchema = new mongoose.Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    category: { type: String, enum: ["technical", "soft"], required: true },
    icon: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = model<ISkill>("Skill", skillSchema);
