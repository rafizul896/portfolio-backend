import mongoose, { Schema } from "mongoose";
import { IExperience } from "./experience.interface";

const experienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    from: {
      type: Date,
      required: [true, "Start date (from) is required"],
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    companyLogo: {
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

export const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);
