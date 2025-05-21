import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    liveUrl: {
      type: String,
    },
    githubRepoUrl: {
      frontend: {
        type: String,
      },
      backend: {
        type: String,
      },
    },
    features: {
      type: [String],
      required: true,
    },
    improvements: {
      type: [String],
    },
    challenges: {
      type: [String],
    },
    technologies: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
