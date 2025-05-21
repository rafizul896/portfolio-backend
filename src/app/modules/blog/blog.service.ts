import { Request } from "express";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { IUploadedFile } from "../../interfaces/file";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createBlog = async (req: Request) => {
  const file = req.file as IUploadedFile;
  const blogData = req.body as IBlog;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    blogData.thumbnail = uploadToCloudinary?.secure_url;
  }
  const result = await Blog.create(blogData);
  return result;
};

const getAllBlogs = async (filters: any = {}, pagination: any = {}) => {
  const { page = 1, limit = 10 } = pagination;

  const skip = (page - 1) * limit;

  const query: any = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.searchTerm) {
    query.$or = [
      { title: { $regex: filters.searchTerm, $options: "i" } },
      { content: { $regex: filters.searchTerm, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: blogs,
  };
};

const getBlogById = async (id: string) => {
  return await Blog.findById(id);
};

const getBlogBySlug = async (slug: string) => {
  return await Blog.findOne({ slug });
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlog = async (id: string) => {
  return await Blog.findByIdAndDelete(id);
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
