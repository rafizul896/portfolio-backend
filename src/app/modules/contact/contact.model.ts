import mongoose from "mongoose";
import { IContact } from "./contact.interface";

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required!"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required!"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
